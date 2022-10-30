import Layout from '../common/Layout';
import { useEffect, useState, useRef } from 'react';
import Popup from '../common/Popup';
import { useSelector, useDispatch } from 'react-redux';
import * as types from '../../redux/actionType';

export default function Video() {
  const dispatch = useDispatch();
  const categories = ['재즈', '테크', '인문학', '피아노'];
	const Vids = useSelector(store => store.youtubeReducer.youtube.items);
	const TotalCount = useSelector(store => store.youtubeReducer.youtube.pageInfo?.totalResults);
  const [ Index, setIndex ] = useState(0);
  const [ Option, setOption ] = useState(categories[0]);
  const [ Loading, setLoading ] = useState(true);
  const [ IsClickable, setClickable ] = useState(true);
  const pop = useRef(null);
  const frame = useRef(null);

 
  // 유튜브 옵션 변경
  const showYoubute = (query) => {
    if (!IsClickable) return;
    setLoading(true);

    setOption({query: query, size: 24});
  };

  // Option 바뀔 때 마다 데이터 변경
  useEffect(() => {
    dispatch({
      type: types.YOUTUBE.start,
      Option: Option
    })
  }, [Option])

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
    }, 0);
  }, [Vids]);

  // 기본 데이터 재즈로 뿌려주기
  useEffect(()=>{
    showYoubute(categories[0]);
  }, []);

  return (
    <>
      <Layout name='video'>
        <div className='inner'>
          {Loading && 
            <img src={`${process.env.PUBLIC_URL}/img/spinner.gif`} className='loading' alt='' />
          }
          <div className='searchBox'>
            <ul>
              {categories.map((cate, idx)=>{
                return (
                  <li key={idx}
                    onClick={()=>{showYoubute(cate)}}
                    className={Option.query === cate ? 'on' : null}
                  >#{cate}</li>
                )
              })}
            </ul>
            <p className='articleTotal'>
              <span>총 {TotalCount}개</span>
              <span className="provided">
                <span>provided by</span>
                <a href='https://developers.google.com/youtube?hl=ko' target='_blank' rel='noopener noreferrer'>
                  <img src={process.env.PUBLIC_URL + '/img/youtube.png'} alt='youtube' />
                </a>
              </span>
            </p>
          </div>
          
          <div className='frame' ref={frame}>
          {Vids ? Vids.map((data, idx)=>{
            let title = data.snippet.title;
            let description = data.snippet.description;
            let date = data.snippet.publishedAt;

            if(description.length > 200) description = description.substring(0, 200) + '...';
            date = date.split('T')[0];

            return (
              <article key={idx}>
                <div className='imgBox' onClick={()=>{ pop.current.setOpen(true); setIndex(idx)}}>
                  <div className='title'>
                    <h3>{title}</h3>
                  </div>
                  <div className='pic'>
                    <img src={data.snippet.thumbnails.high.url} alt={data.snippet.title} />
                  </div>
                </div>
                <div className='txtBox'>
                <p className='desc'>
                  {description}
                </p>
                <p className='author'>
                  {date}
                </p>
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
        {Vids && 
          <iframe title={Vids[Index].snippet.title} src={`https://www.youtube.com/embed/${Vids[Index].id.videoId}`} frameBorder='0'></iframe>
        }
      </Popup>
    </>
  );
}