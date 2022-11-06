import { useEffect, useState } from 'react';

export default function Visual() {

  const [ Index, setIndex ] = useState(1);

  useEffect(()=>{
    const showNext = setTimeout(()=>{
      if (Index < 3) {
        setIndex(Index + 1);
      } else {
        setIndex(1);
      };
    }, 3000);
    return (()=>{
      clearTimeout(showNext);
    });
  }, [Index]);

  return (
    <figure id='mainVisual' className='myScroll'>
      <div className='frame'>
        <article data-index='1' className={Index === 1 ? 'on' : null}>
          <div className='inner'>
            <h2>Title1</h2>
            <p>Description1</p>
          </div>
          <div className='wrap'>
            <div className='imgBox'>
              이미지1
            </div>
          </div>
        </article>
        <article  
          data-index='2' className={Index === 2 ? 'on' : null}
        >
          <div className='inner'>
            <h2>Title2</h2>
            <p>Description2</p>
          </div>
          <div className='wrap'>
            <div className='imgBox'>
              이미지2
            </div>
          </div>
        </article>
        <article  
          data-index='3' className={Index === 3 ? 'on' : null}
        >
          <div className='inner'>
            <h2>Title3</h2>
            <p>Description3</p>
          </div>
          <div className='wrap'>
            <div className='imgBox'>
              이미지3
            </div>
          </div>
        </article>
      </div>
      <div className='control'>
        <ul>
          <li
            data-index='1' className={Index === 1 ? 'on' : null}
            onClick={()=>setIndex(1)}
          >
            <span>
              제목1
            </span>
          </li>
          <li
            data-index='2' className={Index === 2 ? 'on' : null}
            onClick={()=>setIndex(2)}
          >
            <span>
              제목2
            </span>
          </li>
          <li
            data-index='3' className={Index === 3 ? 'on' : null}
            onClick={()=>setIndex(3)}
          >
            <span>
              제목3
            </span>
          </li>
          <li
            data-index='4' className={Index === 4 ? 'on' : null}
            onClick={()=>setIndex(4)}
          >
            <span>
              제목4
            </span>
          </li>
          <li
            data-index='5' className={Index === 5 ? 'on' : null}
            onClick={()=>setIndex(5)}
          >
            <span>
              제목5
            </span>
          </li>
        </ul>
      </div>

      <div className='floatingBox'>
        <div className='imgBox'>

        </div>
        <div className='txtBox'>
          <span>텍스트1</span>
          <h3>텍스트1</h3>
          <span>텍스트1</span>
        </div>
      </div>
    </figure>
  );
}