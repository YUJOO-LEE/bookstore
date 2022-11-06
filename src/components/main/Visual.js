import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

export default function Visual() {

  const baseUrl = process.env.PUBLIC_URL;
  const Visual = useSelector(store=>store.visualReducer.visual);
  const [ Index, setIndex ] = useState(0);
  const [ Timer, setTimer ] = useState(false);

  useEffect(()=>{
    if (!Timer) return;

    const showNext = setTimeout(()=>{
      setTimer(false);
      if (Index < 4) {
        setIndex(Index + 1);
      } else {
        setIndex(0);
      };
      
      setTimeout(()=>{
        setTimer(true);
      }, 0)
    }, 5000);

    return (()=>{
      clearTimeout(showNext);
    });
  }, [Timer, Index]);

  useEffect(()=>{
    setTimer(true);
  }, [])

  return (
    <figure id='mainVisual' className='myScroll'>
      <div className='frame'>
        {Visual?.map((data, idx)=>{
          return (
            <article 
              key={idx}
              className={Index === idx ? 'on' : null}
            >
              <div className='inner'>
                <h2>{data.title}</h2>
                <p>{data.desc}</p>
              </div>
              <div className='wrap'
                style={{background: `linear-gradient(45deg, ${data.color1}, ${data.color2})`}}
              >
                <div className='imgBox'>
                  <img src={`${baseUrl}/img/${data.img}`} alt={data.title} />
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <div className='timer'>
        <svg viewBox='0 0 30 30' className='bg'>
          <circle cx='15' cy='15' r='14'></circle>
        </svg>
        <svg viewBox='0 0 30 30' className='progress'
        >
          <circle cx='15' cy='15' r='14'
            className={Timer ? 'on' : null}
          ></circle>
        </svg>
        <FontAwesomeIcon icon={faPlay}
          onClick={()=>setTimer(!Timer)}
          className='btnTimer'
          style={{display: Timer ? 'none' : 'block'}}
        ></FontAwesomeIcon>
        <FontAwesomeIcon icon={faPause}
          onClick={()=>setTimer(!Timer)}
          className='btnTimer'
          style={{display: Timer ? 'block' : 'none'}}
        ></FontAwesomeIcon>
      </div>
      <div className='control'>
        <ul>
          {Visual.map((data, idx)=>{
            return (
              <li key={idx}
                className={Index === idx ? 'on' : null}
                onClick={()=>setIndex(idx)}
              >
                <span>
                  {data.name}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <Link className='floatingBox' to='/store'>
        <div className='imgBox'>
          <FontAwesomeIcon icon={faMapLocationDot}></FontAwesomeIcon>
          {/* <img src={`${baseUrl}/img/map.png`} alt='지도 아이콘' /> */}
        </div>
        <div className='txtBox'>
          <span>Store Address, Contact</span>
          <h3>Search store</h3>
          <span>Check out the location of the store on the map at a glance!</span>
        </div>
      </Link>
    </figure>
  );
}