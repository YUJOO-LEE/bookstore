import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Book() {

  //f3b4c5064be29701921427a3d6702642
  //query: keyword, size: num, page: startNum
  const categories = ['책', '테크', '브랜딩', '사회', '소설'];
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState(categories[0]);
  
  // search book api
  const bookSearch = (params) => {
    return axios.get('https://dapi.kakao.com/v3/search/book', { params, headers: {
      Authorization: 'KakaoAK f3b4c5064be29701921427a3d6702642',
    }});
  };

  // book search 핸들러
  const bookSearchHttpHandler = async (query, reset) => {
    const params = {
      query: query,
      sort: 'accuracy', // accuracy | recency 정확도 or 최신
      page: 1, // 페이지번호
      size: 20, // 한 페이지에 보여 질 문서의 개수
    };

    const { data } = await bookSearch(params); // api 호출

    if (reset) {
      setBooks(data.documents);
    } else {
      setBooks(books.concat(data.documents));
    }
  };

  // 책 검색
  const searchBook = (text) => {
    setQuery(text);
  };
  
  // 리스트 출력
  useEffect(() => {
    bookSearchHttpHandler(query, true);
  }, [query]);

  return (
    <Layout name='book'>
      <div className="category">
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
      </div>

      <div className="frame">
        {books.map((item, idx)=>{
          return(
          <article key={idx}>
            <div className="imgBox">
            <a href={item.url} target='_blank'>
              <div className="bg">
                <img src={item.thumbnail} alt={item.title} />
              </div>
              <div className="title">
                <p>{item.publisher}</p>
                <h3>{item.title}</h3>
              </div>
              <div className="pic">
                <img src={item.thumbnail} alt={item.title} />
              </div>
            </a>
            </div>
            {item.status === '정상판매' ? <p className="onSale on">구매가능</p> : <p className="onSale">구매불가</p>}
            <div className="txtBox">
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
    </Layout>
  );
}