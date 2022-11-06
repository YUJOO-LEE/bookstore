import { useEffect, useState } from "react";

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
            <h2>Title</h2>
            <p>Description</p>
          </div>
          <div className='frame'>
            <div className='imgBox'>
              이미지
            </div>
          </div>
        </article>
        <article  
          data-index='2' className={Index === 2 ? 'on' : null}
        >
          <div className='inner'>
            <h2>Title</h2>
            <p>Description</p>
          </div>
          <div className='frame'>
            <div className='imgBox'>
              이미지
            </div>
          </div>
        </article>
        <article  
          data-index='3' className={Index === 3 ? 'on' : null}
        >
          <div className='inner'>
            <h2>Title</h2>
            <p>Description</p>
          </div>
          <div className='frame'>
            <div className='imgBox'>
              이미지
            </div>
          </div>
        </article>
      </div>
    </figure>
  );
}