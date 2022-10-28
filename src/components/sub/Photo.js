import { useEffect, useRef, useState } from 'react';
import Layout from '../common/Layout';import axios from 'axios';
import Popup from '../common/Popup';

export default function Photo() {

  const categories = ['책', '하늘', '동물'];
  const [ Items, setItems ] = useState([]);
  const [ Loading, setLoading ] = useState(true);
  const [ IsClickable, setClickable ] = useState(true);
  const [ Index, setIndex ] = useState(0);
  const [ TotalCount, setTotalCount ] = useState(0);
  const frame = useRef(null);
  const pop = useRef(null);

  // api 호출
  const getFlickr = (params)=>{
    return axios.get('https://www.flickr.com/services/rest/', { params });
  };

  // 검색 핸들러
  const flickrSearchHttpHandler = async ({type='interest', query=categories[0], size=24, userid})=>{

    const params = {
      api_key: '67f7c54ac9fe4dd292e245fbb1302b24',
      per_page: size, // 출력갯수
      format: 'json', // 데이터 타입
      nojsoncallback: 1, // json외 데이터 제외
    };

    // type 별 쿼리 지정
    if (type === 'interest') {
      params.method = 'flickr.interestingness.getList';
    } else if (type === 'search') {
      params.method = 'flickr.photos.search';
      params.tags = query;
    } else if (type === 'user') {
      params.method = 'flickr.people.getPhotos';
      params.user_id = userid;
    }

    if (!IsClickable) return;
    setClickable(false);
    setLoading(true);
    const { data } = await getFlickr(params); // api 호출
    setItems(data.photos.photo);
    setTotalCount(data.photos.total);

    setTimeout(() => {
      setLoading(false);
      setClickable(true);
    }, 0);
  }

  // 로딩 이미지 노출에 대한 frame 효과 처리
  useEffect(()=>{
    if (Loading) {
      frame.current?.classList.remove('on');
    } else {
      frame.current?.classList.add('on');
    }
  }, [Loading])

  // 기본 데이터 interest로 뿌려주기
  useEffect(()=>{
    flickrSearchHttpHandler({type: 'interest'});
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
            <li onClick={()=>{flickrSearchHttpHandler({type: 'interest'})}}>#추천</li>
            {categories.map((cate, idx)=>{
              return (
                <li key={idx}
                  onClick={()=>{flickrSearchHttpHandler({type: 'search', query: cate})}}
                >#{cate}</li>
              )
            })}
          </ul>
          <p className='articleTotal'>
            <span>총 {TotalCount}개</span>
            <span className="provided">
              <span>provided by</span>
              <a href='https://www.flickr.com/services/' target='_blank' rel='noopener noreferrer'>
                <img src={process.env.PUBLIC_URL + '/img/flickr.png'} alt='flickr' />
              </a>
            </span>
          </p>
        </div>
        
        <div className='frame' ref={frame}>
          {Items.length ? Items.map((item, idx)=>{
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
                    flickrSearchHttpHandler({type: 'user', userid: item.owner});
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
      {Items.length > 0 &&
        <img src={`https://live.staticflickr.com/${Items[Index].server}/${Items[Index].id}_${Items[Index].secret}_b.jpg`} alt={Items[Index].title} />
      }
    </Popup>
  </>
  );
}