import { useEffect, useRef, useState } from 'react';
import Layout from '../common/Layout';import axios from 'axios';
import Popup from '../common/Popup';

export default function Photo() {

  const categories = ['책', '하늘', '바다'];
  const [ items, setItems ] = useState([]);
  const [ Loading, setLoading ] = useState(true);
  const [ isClickable, setClickable ] = useState(true);
  const [ index, setIndex ] = useState(0);
  const [ totalCount, setTotalCount ] = useState(0);

  const frame = useRef(null);
  const pop = useRef(null);

  // 데이터 받아오기
  const getFlickr = async (option)=>{
    const key = '67f7c54ac9fe4dd292e245fbb1302b24';
    const methodInterest = 'flickr.interestingness.getList';
    const methodSearch = 'flickr.photos.search';
    const methodUser = 'flickr.people.getPhotos';
    const num = 24;

    let url = '';
    if (option.type === 'interest') {
      url = `https://www.flickr.com/services/rest/?method=${methodInterest}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1`;
    } else if (option.type === 'search') {
      url = `https://www.flickr.com/services/rest/?method=${methodSearch}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&tags=${option.tags}`;
    } else if (option.type === 'user') {
      url = `https://www.flickr.com/services/rest/?method=${methodUser}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&user_id=${option.userid}`;
    }
    
    if (!isClickable) return;
    setClickable(false);
    setLoading(true);
    const result = await axios.get(url);
    setItems(result.data.photos.photo);
    setTotalCount(result.data.photos.total);

    setTimeout(() => {
      setLoading(false);
      frame.current.classList.add('on');
      setClickable(true);
    }, 0);
  }

  // 태그 별 검색 처리
  const showSearch = (keyword)=>{
    getFlickr({type: 'search', tags: keyword});
  };

  // 기본 데이터 interest로 뿌려주기
  useEffect(()=>{
    getFlickr({type: 'interest'});
  }, []);

  return (
    <>
    <Layout name='photo'>
      <div className='inner'>
        {Loading && 
          <img src={`${process.env.PUBLIC_URL}/img/spinner.gif`} className='loading' alt='' />
        }
        <div className='searchBox'>
          <ul>
            <li onClick={()=>{getFlickr({type: 'interest'})}}>#추천</li>
            {categories.map((cate, idx)=>{
              return (
                <li key={idx}
                  onClick={()=>{showSearch(cate)}}
                >#{cate}</li>
              )
            })}
          </ul>
          <p className='articleTotal'>
            <span>총 {totalCount}개</span>
            <p className="provided">
              <span>provided by</span>
              <a href='https://www.flickr.com/services/' target='_blank' rel='noopener noreferrer'>
                <img src={process.env.PUBLIC_URL + '/img/flickr.png'} alt='flickr' />
              </a>
            </p>
          </p>
        </div>
        
        <div className='frame' ref={frame}>
          {items.length ? items.map((item, idx)=>{
            return (
              <article key={idx}>
                <div className='pic' onClick={()=>{
                  pop.current.setOpen(true);
                  setIndex(idx);
                  }}>
                  <img src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_w.jpg`} alt={item.title} />
                </div>
                <h2>{item.title}</h2>
                <div className='profile'>
                  <img src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`} alt={item.owner} onError={(e)=>{
                    e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif');
                  }} />
                  <span onClick={()=>{
                    frame.current.classList.remove('on');
                    getFlickr({type: 'user', userid: item.owner});
                  }}>{item.owner}</span>
                </div>
              </article>
            );
          })
          : <div className='noData'>검색된 데이터가 없습니다.</div>
          }
        </div>
      </div>
    </Layout>

    <Popup ref={pop}>
      {items.length > 0 &&
        <img src={`https://live.staticflickr.com/${items[index].server}/${items[index].id}_${items[index].secret}_b.jpg`} alt={items[index].title} />
      }
    </Popup>
  </>
  );
}