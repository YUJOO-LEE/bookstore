import { useRef } from 'react';
import { useEffect } from 'react';

export default function Visual() {

  const txtBox = useRef(null);
  useEffect(()=>{
    txtBox.current.classList.add('on');
  }, [])

  return (
    <figure id='mainVideo' className='myScroll'>
      <div className='vid'>
        <video src={process.env.PUBLIC_URL + '/img/library.mp4'} autoPlay loop muted></video>
      </div>
      <div className='inner' ref={txtBox}>
        <h2>In the end,<br/>we'll all become <span>Stories</span></h2>
        <p>Whether you’re preparing for class, getting Flyer gear for a game, or decorating your space, Yujoo Bookstore has what you need. he first floor houses clothing, gifts, school and office supplies, stationary, and more. You’ll find textbooks and course materials on the second floor.</p>
      </div>
    </figure>
  );
}