import { useEffect, useState, useRef } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneSquare } from '@fortawesome/free-solid-svg-icons';
import Layout from '../common/Layout';


export default function Store() {
  
  const { kakao } = window;
  const Stores = useSelector(store=>store.storesReducer.stores, shallowEqual);
  const Start = Stores.length;
  const container = useRef(null);
  const [ Option, setOption ] = useState('');
  const [ Location, setLocation ] = useState(null);
  const [ Index, setIndex ] = useState(0);
  const categories = ['Seoul', 'Daejeon', 'Busan'];

  useEffect(() => {
    if (!container.current || !Stores.length) return;

    const lat = +Stores[Index].latLng.split(',')[0];
    const lng = +Stores[Index].latLng.split(',')[1];
    const latLng = new kakao.maps.LatLng(lat,lng);
    const option = {
      center: latLng,
      lever: 3
    };

    // 인포윈도우에 표출될 내용
    const iwContent = `<div class='infoWindow'>
      <h3>${Stores[Index].mapTitle}</h3>
      <p>
        <a href='https://map.kakao.com/link/map/${Stores[Index].mapTitle},${Stores[Index].latLng}' target='_blank'>View Detail</a>
        <a href='https://map.kakao.com/link/to/${Stores[Index].mapTitle},${Stores[Index].latLng}' target='_blank'>Finding a way</a>
      </p>
    </div>`;
  
    const con = container.current;
    const mapInstance = new kakao.maps.Map(con, option);
    const zoomControl = new kakao.maps.ZoomControl();
    mapInstance.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    setLocation(mapInstance);
  
    // 인포 윈도우 생성
    new kakao.maps.InfoWindow({
      map: mapInstance,
      position: latLng, 
      content: iwContent
    })

    return ()=>{
      con.innerHTML = '';
    }
  }, [Index, Start]);

  // 리사이즈 이벤트
  useEffect(()=>{
    const resize = ()=>{
      if (!Stores[Index]) return;
      const lat = +Stores[Index].latLng.split(',')[0];
      const lng = +Stores[Index].latLng.split(',')[1];
      Location.setCenter(new kakao.maps.LatLng(lat,lng));
    }

    window.addEventListener('resize', resize);
    return(()=>{
      window.removeEventListener('resize', resize);
    });
  }, [Location]);

  return (
    <Layout name='store'>
      <div className='inner'>
        <div className="searchBox">
          <ul className='category'>
            <li
              onClick={()=>{setOption('')}}
              className={!Option ? 'on' : null}
            >#All</li>
            {categories.map((cate, idx)=>{
              return (
                <li key={idx}
                  onClick={()=>{setOption(cate)}}
                  className={Option === cate ? 'on' : null}
                >#{cate}</li>
              )
            })}
          </ul>
          <p className='articleTotal'>
            <span>총 {Start ? Stores.filter(store=>
                !Option || store.address.includes(Option)
              ).length : 0}개</span>
            <span className="provided">
              <span>provided by</span>
              <a href='https://apis.map.kakao.com/' target='_blank' rel='noopener noreferrer'>
                <img src={process.env.PUBLIC_URL + '/img/kakao.png'} alt='kakao' />
              </a>
            </span>
          </p>
        </div>
        <div className="frame">
          <div className='storeList'>
            <ul>
              {Start ? Stores.filter(store=>
                !Option || store.address.includes(Option)
              ).map((store, idx)=>{

                const id = +store.id;

                return (
                  <li key={idx} 
                    className={Index === id ? 'on' : null}
                    onClick={()=>setIndex(id)}
                  >
                  <h3>{store.listTitle}</h3>
                  <p className='address'>{store.address}</p>
                  <p className='tel'>
                    <FontAwesomeIcon icon={faPhoneSquare}></FontAwesomeIcon>
                    {store.tel}</p>
                  </li>
                );
              })
              : <li>검색된 데이터가 없습니다.</li>
              }
            </ul>
          </div>
          <div className='storeMap'>
            <div id='map' ref={container}></div>
          </div>
        </div>

      </div>
    </Layout>
  );
}