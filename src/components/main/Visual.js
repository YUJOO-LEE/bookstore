import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Anime from '../../asset/anime';
import { useEffect, useRef, useState } from 'react';

export default function Visual() {

  const frame = useRef(null);
  const [ clickable, setClickable ] = useState(true);
  const [ autoplay, setAutoplay ] = useState(true);

  // 초기화
  useEffect(()=>{
    const lis = frame.current.querySelectorAll('li');

    const init = ()=>{
      const len = lis.length;
      frame.current.prepend(frame.current.lastElementChild);
      frame.current.style.left = '-100%';
      frame.current.style.width = `${100 * len}%`;
      lis.forEach((el)=>{
        el.style.width = `${100 / len}%`;
      })
    }

    init();
  }, []);


  // 클릭 시 이벤트
  const handleSlider = (event)=>{
    if (!clickable) return;
    setAutoplay(false);
    setClickable(false);
    sliding(event);
  };

  // 슬라이드 동작
  const sliding = (event)=>{
    const value = event === 'prev' ? '0%' : '-200%';
    
    new Anime(frame.current, {
      prop: 'left',
      value: value,
      duration: 1000,
      callback: ()=>{
        if (event === 'prev') {
          frame.current.prepend(frame.current.lastElementChild);
        } else{
          frame.current.append(frame.current.firstElementChild);
        }
        frame.current.style.left = "-100%";
        setClickable(true);
        setAutoplay(true);
      }
    })
  }


  // 슬라이드 자동 재생
  useEffect(()=>{
    let play;
    if (autoplay) {
      play = setTimeout(()=>{
        handleSlider('next');
      }, 3000)
    } else {
      clearTimeout(play);
    }
    return (()=>{
      clearTimeout(play);
    });
  }, [autoplay])


  return (
    <figure className='mainSlider myScroll'>
      <div className='slide'>
        <ul ref={frame}>
          <li data-index='1'>
            <div className='inner'>
              <h2>In the end,<br/>we'll all become <span>stories</span></h2>
              <p>Whether you’re preparing for class, getting Flyer gear for a game, or decorating your space, Yujoo Bookstore has what you need.</p>
            </div>
          </li>
          <li data-index='2'>
            <div className='inner'>
              <h2>A book that is shut is but a <span>block</span></h2>
              <p>The first floor houses clothing, gifts, school and office supplies, stationary, and more. You’ll find textbooks and course materials on the second floor.</p>
            </div>
          </li>
          <li data-index='3'>
            <div className='inner'>
              <h2>Today a reader, tomorrow a <span>leader</span></h2>
              <p>We promote the common good through a dedication to student success, school spirit, and world class customer service.</p>
            </div>
          </li>
        </ul>
      </div>
      <div className='slideBtns'>
        <span className='prev' onClick={()=>handleSlider('prev')}>
          <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
        </span>
        <span className='next' onClick={()=>handleSlider('next')}>
          <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
        </span>
      </div>
    </figure>
  );
}