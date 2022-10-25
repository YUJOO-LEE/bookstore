import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../common/Layout';
import Comments from '../common/Comment_list';
import Post from '../common/Comment_post';
import BookData from '../../asset/bookdata';

export default function Content() {

	const pageParams = useParams();
  const [ content, setContent ] = useState([]);

  // review 핸들러
  const reviewHandler = ()=>{
    let data = localStorage.getItem('post');
    return JSON.parse(data);
  };

  // 책 정보 출력
  useEffect(()=>{
    BookData([pageParams.bookId, 1, setContent]);
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