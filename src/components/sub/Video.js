import Layout from '../common/Layout';
import { useEffect, useState, useRef } from 'react';
import Popup from '../common/Popup';
import axios from 'axios';

export default function Video() {
  const categories = ['재즈', '테크', '인문학', '피아노'];
  const [ vids, setVids ] = useState({})
  const [ index, setIndex ] = useState(0);
  const [ query, setQuery ] = useState(categories[0]);
  const [ totalCount, setTotalCount ] = useState(0);
  const [ Loading, setLoading ] = useState(true);
  const pop = useRef(null);
  const frame = useRef(null);

  // search youtube api
  const getYoutube = (params)=>{
    return axios.get('https://www.googleapis.com/youtube/v3/search', { params });
  };

  const youtubeSearchHttpHandler = async (query=categories[0], size=24)=>{

    const params = {
      key: 'AIzaSyBiOlx-OiCnABYBdphO59DYaid3MDzX9H8',
      part: 'snippet',  // 제목 등 정보 포함
      q: query, // 검색어
      maxResults: size, // 출력갯수
      eventType: 'completed', // 완료된 방송만 출력
      safeSearch: 'strict', // 제한된 콘텐츠 제외
      type: 'video',  // 검색결과 video만 포함
    };

    setLoading(true);
    const { data } = await getYoutube(params); // api 호출
    setTotalCount(data.pageInfo.totalResults);
    setVids(data.items);

    setTimeout(() => {
      setLoading(false);
    }, 0);

  }
 
  // 책 검색
  const searchYoubute = (text) => {
    setQuery(text);
  };

  useEffect(() => {
    youtubeSearchHttpHandler(query);
  }, [query])

  useEffect(()=>{
    if (Loading) {
      frame.current?.classList.remove('on');
    } else {
      frame.current?.classList.add('on');
    }
  }, [Loading])
  
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
                    onClick={()=>{searchYoubute(cate)}}
                  >#{cate}</li>
                )
              })}
            </ul>
            <p className='articleTotal'>
              <span>총 {totalCount}개</span>
              <span className="provided">
                <span>provided by</span>
                <a href='https://developers.google.com/youtube?hl=ko' target='_blank' rel='noopener noreferrer'>
                  <img src={process.env.PUBLIC_URL + '/img/youtube.png'} alt='youtube' />
                </a>
              </span>
            </p>
          </div>
          
          <div className='frame' ref={frame}>
          {vids.length > 0 ? vids.map((data, index)=>{
            let title = data.snippet.title;
            let description = data.snippet.description;
            let date = data.snippet.publishedAt;

            if(description.length > 200) description = description.substring(0, 200) + '...';
            date = date.split('T')[0];

            return (
              <article key={index}>
                <div className='imgBox' onClick={()=>{ pop.current.setOpen(true); setIndex(index)}}>
                  <div className='title'>
                    <p>{}</p>
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
        {vids.length > 0 && 
          <iframe title={vids[index].snippet.title} src={`https://www.youtube.com/embed/${vids[index].id.videoId}`} frameBorder='0'></iframe>
        }
      </Popup>
    </>
  );
}