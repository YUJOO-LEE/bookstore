import Layout from '../common/Layout';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BookData from '../../asset/bookdata';

export default function Book() {

  //f3b4c5064be29701921427a3d6702642
  //query: keyword, size: num, page: startNum
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
    BookData({query: query, 
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
        <p className='articleTotal'>총 {meta.total_count}개</p>
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