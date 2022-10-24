import Layout from '../common/Layout';
import Comments from '../common/Comment_list';
import Post from '../common/Comment_post';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Content() {

	const pageParams = useParams();
  const [ content, setContent ] = useState([]);

  // search book api
  const bookSearch = (params)=>{
    return axios.get('https://dapi.kakao.com/v3/search/book', { params, headers: {
      Authorization: 'KakaoAK f3b4c5064be29701921427a3d6702642',
    }});
  };

  // book search 핸들러
  const bookSearchHttpHandler = async (bookId)=>{
    const params = {
      query: bookId,
      sort: 'accuracy',
      page: 1, // 페이지번호
      size: 1, // 한 페이지에 보여 질 문서의 개수
    };

    const { data } = await bookSearch(params); // api 호출
    setContent(data.documents);

    console.log(data);
  };

  // review 핸들러
  const reviewHandler = ()=>{
    let data = localStorage.getItem('post');
    return JSON.parse(data);
  };

  // 책 정보 출력
  useEffect(()=>{
    bookSearchHttpHandler(pageParams.bookId);
  }, [pageParams]);
  
  const [ comments, setComments ] = useState(reviewHandler());

  return (
    <Layout name='content'>
      {content.length && 
      <div className='inner'>
        <div className='title'>
          <h1>{content[0].title}</h1>
          <p>{content[0].authors.join(',')} ({content[0].translators.join(',')}) | {content[0].publisher}</p>
          <p>{content[0].price}</p>
        </div>
        <div className='content'>{content[0].contents}</div>
      </div>
      }

      <hr />

      <div className='inner'>
        <Post posts={comments} setPosts={setComments} bookId={pageParams.bookId}></Post>
        <Comments posts={comments} setPosts={setComments} bookId={pageParams.bookId}></Comments>
      </div>
    </Layout>
  );
}