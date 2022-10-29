import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../common/Layout';
import Popup from '../common/Popup';
import * as types from '../../redux/actionType';

export default function Photo() {

  const dispatch = useDispatch();
  const categories = ['책', '하늘', '동물'];
	const Items = useSelector(store => store.flickrReducer.flickr.photo);
	const TotalCount = useSelector(store => store.flickrReducer.flickr.total);
  const [ Option, setOption ] = useState(true);
  const [ Loading, setLoading ] = useState(true);
  const [ IsClickable, setClickable ] = useState(true);
  const [ Index, setIndex ] = useState(0);
  const frame = useRef(null);
  const pop = useRef(null);
  const size = 24;

  // 플리커 옵션 변경
  const showFlickr = async (type, query)=>{
    if (!IsClickable) return;
    setLoading(true);

    switch (type) {
      case 'interest':
        setOption({type: type, size: size});
        break;
      case 'user':
        setOption({type: type, userid: query, size: size});
        break;
      case 'search':
        setOption({type: type, query: query, size: size});
        break;
    }
  }

  // Option 바뀔 때 마다 데이터 변경
  useEffect(()=>{
    dispatch({
      type: types.FLICKR.start,
      Option: Option
    })
  }, [Option]);


  // 로딩 이미지 노출에 대한 frame 효과 처리
  useEffect(()=>{
    if (Loading) {
      setClickable(false);
      frame.current?.classList.remove('on');
    } else {
      setClickable(true);
      frame.current?.classList.add('on');
    }
  }, [Loading])
  
  // 데이터 변경 시 로딩 효과 전환
  useEffect(()=>{
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [Items]);

  // 기본 데이터 interest로 뿌려주기
  useEffect(()=>{
    showFlickr('interest');
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
            <li onClick={()=>{showFlickr('interest')}}>#추천</li>
            {categories.map((cate, idx)=>{
              return (
                <li key={idx}
                  onClick={()=>{showFlickr('search', cate)}}
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
          {Items?.map((item, idx)=>{
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
                    showFlickr('user', item.owner);
                  }}>{item.owner}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </Layout>

    <Popup ref={pop}>
      {Items &&
        <img src={`https://live.staticflickr.com/${Items[Index].server}/${Items[Index].id}_${Items[Index].secret}_b.jpg`} alt={Items[Index].title} />
      }
    </Popup>
  </>
  );
}