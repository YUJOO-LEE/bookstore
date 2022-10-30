import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as types from '../../redux/actionType';

export default function Books() {

  const dispatch = useDispatch();

  const Books = useSelector(store=> store.booksReducer.books.documents);
  const frame = useRef(null);

  useEffect(() => {
    dispatch({
      type: types.BOOKS.start,
      Option: {query: '책', size: 4}
    });
  }, [])
  
  return (
    <section id='books' className='myScroll'>
      <div className='inner'>
        <h2>Books</h2>

        <div className='frame' ref={frame}>
        {Books?.length ? Books.map((item, idx)=>{
          if (idx > 3) return;
          
          return(
          <article key={idx}>
            <div className='imgBox'>
            <Link to={`/content/${item.isbn.split(' ')[0]}`}>
              <div className='bg'>
                <img src={item.thumbnail} alt={item.title} />
              </div>
              <div className='title'>
                <p>{item.publisher}</p>
                <h3>{item.title}</h3>
              </div>
              <div className='pic'>
                <img src={item.thumbnail} alt={item.title} />
              </div>
            </Link>
            </div>
            {item.status === '정상판매' ? <p className='onSale on'>구매가능</p> : <p className='onSale'>구매불가</p>}
            <div className='txtBox'>
              <p className='desc'>
                {item.contents}
              </p>
              <p className='author'>
                {item.authors[0]}
                {item.authors.length > 1 ? `외 ${item.authors.length - 1}명` : null}
              </p>
            </div>
          </article>
        )})
        : <div className='noData'>검색된 데이터가 없습니다.</div>
        }
        </div>
      </div>
    </section>
  );
}