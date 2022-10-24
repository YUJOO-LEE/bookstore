import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Book() {

  //f3b4c5064be29701921427a3d6702642
  //query: keyword, size: num, page: startNum
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  
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

    console.log(data.documents);
  };

  // 책 검색
  const searchBook = (text) => {
    setQuery(text);
  };
  
  // 리스트 출력
  useEffect(() => {
    if (query.length > 0) {
      bookSearchHttpHandler(query, true);
    } else {
      bookSearchHttpHandler('책', true);
    }
  }, [query]);

  return (
    <Layout name='book'>
      <div className="frame">
        {books.map((item, idx)=>{
          return(
          <arcicle key={idx}>
            <div className="pic">
              <img src={item.thumbnail} alt={item.title} />
            </div>
            <div className="txt">
              <h3>{item.title}</h3>
              <p>
                {item.authors[0]}
                {item.authors.length > 1 ? `외 ${item.authors.length - 1}명` : null}
              </p>
              <p>{item.publisher}</p>
            </div>
          </arcicle>
        )})}
      </div>
    </Layout>
  );
}