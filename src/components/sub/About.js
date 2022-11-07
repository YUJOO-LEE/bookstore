import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareArrowUpRight, faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import Layout from '../common/Layout';
import { useEffect, useRef, useState } from 'react';

export default function About() {
  const History = useSelector(store=>store.aboutReducer.about.history);
  const Members = useSelector(store=>store.aboutReducer.about.members);

  const [ HistoryIndex, setHistoryIndex ] = useState(-1);
  const [ MemberIndex, setMemberIndex ] = useState(-1);
  const historyFrame = useRef(null);

  useEffect(()=>{
    if (!historyFrame.current) return;
    const lis = historyFrame.current.querySelectorAll('li');
    const pos = [];
    for (let li of lis){
      pos.push(li.offsetTop);
    }

    const scrollEvent = ()=>{
      const base = window.innerHeight / 2 * -1;
      const scroll = window.scrollY || window.pageYOffset;
      pos.map((top, idx)=>{
        if (scroll >= top + base) {
          setHistoryIndex(idx);
        }

        return '';
      })
    }
    window.addEventListener('scroll', scrollEvent);
    return(()=>{
      window.removeEventListener('scroll', scrollEvent);
    });
  }, [historyFrame.current]);

  return (
    <Layout name='about'>
      <div className='title'>
        <div className='inner'>
          <h2>
            <p>Yu</p>
            <p><span></span><span></span></p>
            <p>joo</p>
          </h2>
          <h3>
            Where is human nature so weak as in the <span>bookstore</span>?
          </h3>
          <p>
            It's not just trends or searchable knowledge, but it's content that reads the flow of change and drives the growth of my career and life.
          </p>
        </div>
      </div>
      <div className='history'>
        <div className='inner'>
          <h2>
            We make changes that will go down in history.
          </h2>
          <ul ref={historyFrame}>
            {History?.map((data, idx)=>{
              return(
                <li key={idx}
                  className={HistoryIndex === idx ? 'on' : null}
                >
                  <h3>{data.date}</h3>
                  <p>{data.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className='members'>
        <div className='inner'>
          <h2>
            People yearning for change gathered.
          </h2>
          <ul>
            {Members?.map((data, idx)=>{
              return (
                <li key={idx} 
                  className={idx === MemberIndex? 'on' : null}
                  onClick={()=>setMemberIndex(idx)}
                  style={{backgroundImage: `url(${process.env.PUBLIC_URL}/img/${data.img})`}}
                >
                  <div className='wrap'>
                    <p className='position'>{data.position}</p>
                    <h3>{data.name}</h3>
                    <p className='desc'>{data.text}</p>
                    <span className='btnOn'>
                      view message<FontAwesomeIcon icon={faSquareArrowUpRight}></FontAwesomeIcon>
                    </span>
                    <span className='btnOff' onClick={(e)=>{
                      e.stopPropagation();
                      setMemberIndex(-1);}
                      }>
                      <FontAwesomeIcon icon={faSquareXmark}></FontAwesomeIcon>
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Layout>
  );
}