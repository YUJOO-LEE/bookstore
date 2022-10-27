import Layout from '../common/Layout';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Search from '../../asset/search';

export default function Book() {

  const categories = ['책', '테크', '브랜딩', '인문학'];
  const [ meta, setMeta ] = useState([]);
  const [ books, setBooks ] = useState([]);
  const [ query, setQuery ] = useState(categories[0]);
  
  // 책 검색
  const searchBook = (text) => {
    setQuery(text);
  };
  
  // 리스트 출력
  useEffect(() => {
    Search({query: query, 
      size: 20,
      setMeta: setMeta,
      setBooks: setBooks});
  }, [query]);

  return (
    <Layout name='book'>
    <div className='inner'>
      <div className='searchBox'>
        <ul>
          {categories.map((cate, idx)=>{
            return (
              <li key={idx}
                onClick={()=>{searchBook(cate)}}
                className={query === cate ? 'on' : null}
              >#{cate}</li>
            )
          })}
        </ul>
        <p className='articleTotal'>
          <span>총 {meta.total_count}개</span>
          <span className="provided">
            <span>provided by</span>
            <a href='https://developers.kakao.com/' target='_blank' rel='noopener noreferrer'>
              <img src={process.env.PUBLIC_URL + '/img/kakao.png'} alt='kakao' />
            </a>
          </span>
        </p>
      </div>

      <div className='frame'>
        {books.map((item, idx)=>{
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
        )})}
      </div>
    </div>
    </Layout>
  );
}