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
  const [ TimerBtn, setTimerBtn ] = useState(true);

  // 타이머 작동여부에 따라 인덱스 자동 변경
  useEffect(()=>{
    if (!Timer) return;
    setTimerBtn(true);  // 타이머 작동 시 재생버튼 활성화

    const showNext = setTimeout(()=>{
      setTimer(false);  // class 순간적으로 빼기 위해 타이머 일시정지
      if (Index < 4) {
        setIndex(Index + 1);  // 인덱스 마지막 번호보다 낮으면 +1
      } else {
        setIndex(0);  // 인덱스 마지막번호라면 0으로 초기화
      };
      setTimeout(()=>{
        setTimer(true); // class 다시 부여하기 위해 타이머 재생
      })
    }, 5000);

    return (()=>{ // 업데이트 시 타이머 클리어
      clearTimeout(showNext);
    });
  }, [Timer, Index]);

  // 타이머 재생버튼 클릭에 실제 타이머 연동 
  useEffect(()=>{
    setTimer(TimerBtn);
  }, [TimerBtn])

  // 마운트 시 자동 재생
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
          onClick={()=>setTimerBtn(!TimerBtn)}
          className='btnTimer'
          style={{display: TimerBtn ? 'none' : 'block'}}
        ></FontAwesomeIcon>
        <FontAwesomeIcon icon={faPause}
          onClick={()=>setTimerBtn(!TimerBtn)}
          className='btnTimer'
          style={{display: TimerBtn ? 'block' : 'none'}}
        ></FontAwesomeIcon>
      </div>
      <div className='control'>
        <ul>
          {Visual.map((data, idx)=>{
            return (
              <li key={idx}
                className={Index === idx ? 'on' : null}
                onClick={()=>{
                  setTimer(false);
                  setIndex(idx);
                  setTimeout(()=>{
                    setTimer(true);
                  })
                }}
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