import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as types from '../../redux/actionType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Anime from '../../asset/anime';

export default function Books() {

  const dispatch = useDispatch();

  const Books = useSelector(store=> store.booksReducer.books.documents);
  const frame = useRef(null);
  const titleFrame = useRef(null);
  const [ Clickable, setClickable ] = useState(true);
  const [ Autoplay, setAutoplay ] = useState(true);
  const slideSize = 5;


  const showTitle = ()=>{
    const curIdx = frame.current.querySelectorAll('article')[1]?.dataset.index;
    const titles = titleFrame.current.querySelectorAll('li');
    for (let li of titles) {
      li?.classList.remove('on');
    }
    titles[curIdx]?.classList.add('on');
  }

  // 슬라이드 초기화
  useEffect(()=>{
    const articles = frame.current.querySelectorAll('article');

    const init = ()=>{
      const len = articles.length;
      frame.current.prepend(frame.current.lastElementChild);
      frame.current.style.left = '-100%';
      frame.current.style.width = `${100 * len}%`;
      articles.forEach((el)=>{
        el.style.width = `${100 / len}%`;
      })
      showTitle();
    }

    init();
  }, [frame.current]);

  // 클릭 시 이벤트
  const handleSlider = (event)=>{
    if (!Clickable) return;
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
      duration: 500,
      callback: ()=>{
        if (event === 'prev') {
          frame.current.prepend(frame.current.lastElementChild);
        } else{
          frame.current.append(frame.current.firstElementChild);
        }
        frame.current.style.left = '-100%';
        setClickable(true);
        setAutoplay(true);
        showTitle();
      }
    })
  }

  // 슬라이드 자동 재생
  useEffect(()=>{
    let play;
    if (Autoplay) {
      play = setTimeout(()=>{
        handleSlider('next');
      }, 3000)
    } else {
      clearTimeout(play);
    }
    return (()=>{
      clearTimeout(play);
    });
  }, [Autoplay])

  // 도서 리스트 출력
  useEffect(() => {
    dispatch({
      type: types.BOOKS.start,
      Option: {query: '인문', size: 8}
    });
  }, [])
  
  return (
    <section id='books' className='myScroll'>
      <div className='inner'>
        <div className="txt">
          <h2>Today's book</h2>
          <ul ref={titleFrame}>
          {Books?.length && Books.map((item, idx)=>{
            if (idx >= slideSize) return;
            
            return(
              <li key={idx}>
                {item.publisher}
              </li>
            );
          })}
          </ul>
          <div className='slideBtns'>
            <span className='prev' onClick={()=>handleSlider('prev')}>
              <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
            </span>
            <span className='next' onClick={()=>handleSlider('next')}>
              <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
            </span>
          </div>
        </div>
        <div className='slider'>
          <div className='frame' ref={frame}>
          {Books?.length ? Books.map((item, idx)=>{
            if (idx >= slideSize) return;
            
            return(
            <article key={idx} data-index={idx}>
              <div className='imgBox'>
              <Link to={`/content/${item.isbn.split(' ')[0]}`}>
                <div className='bg'>
                  <img src={item.thumbnail} alt={item.title} />
                </div>
                <div className='pic'>
                  <img src={item.thumbnail} alt={item.title} />
                </div>
              </Link>
              </div>
              <div className='txtBox'>
                <h3>
                  {item.title}
                </h3>
                <p className='desc'>
                  {item.contents}
                </p>
                <p className='author'>
                  {item.authors[0]}
                  {item.authors.length > 1 ? `외 ${item.authors.length - 1}명` : null}
                </p>
                {item.translators.length > 0 &&
                  <p className='translators'>
                    {item.translators[0]}
                    {item.translators.length > 1 ? `외 ${item.translators.length - 1}명` : null}
                  </p>
                }
                <p className='datetime'>
                  {item.datetime.split('T')[0]}
                </p>
              </div>
            </article>
          )})
          : <div className='noData'>검색된 데이터가 없습니다.</div>
          }
          </div>
        </div>
        <div className="bookList">
          <ul>
          {Books?.length && Books.map((item, idx)=>{
            if (idx < slideSize) return;
            
            return(
            <li key={idx} data-index={idx}>
              <div className='imgBox'>
                <Link to={`/content/${item.isbn.split(' ')[0]}`}>
                  <img src={item.thumbnail} alt={item.title} />
                </Link>
              </div>
              <div className='txtBox'>
                <h3>
                  {item.title}
                </h3>
                <p className='author'>
                  {item.authors[0]}
                  {item.authors.length > 1 ? `외 ${item.authors.length - 1}명` : null}
                </p>
              </div>
            </li>
          )})}
          </ul>
        </div>
      </div>
    </section>
  );
}