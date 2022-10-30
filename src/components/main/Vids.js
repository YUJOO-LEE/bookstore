import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import * as types from '../../redux/actionType';
import Popup from '../common/Popup';

export default function Vids() {

  const dispatch = useDispatch();
  const Vids = useSelector(store=>store.youtubeReducer.youtube.items);
  const [ Index, setIndex ] = useState(0);
  const pop = useRef(null);
  const frame = useRef(null);

  useEffect(() => {
    dispatch({
      type: types.YOUTUBE.start,
      Option: {query: '재즈', size: 4}
    });
  }, [])

  return (
    <section id='Vids' className='myScroll'>
      <div className='inner'>
        <h2>Vids</h2>

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
                <div className='pic'>
                  <img src={data.snippet.thumbnails.high.url} alt={data.snippet.title} />
                  <FontAwesomeIcon icon={faYoutube}></FontAwesomeIcon>
                </div>
              </div>
              <div className='txtBox'>
                <h3>{title}</h3>
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

      <Popup ref={pop}>
        {Vids && 
          <iframe title={Vids[Index].snippet.title} src={`https://www.youtube.com/embed/${Vids[Index].id.videoId}`} frameBorder='0'></iframe>
        }
      </Popup>
    </section>
  );
}