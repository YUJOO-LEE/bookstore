import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
    BookData({query: pageParams.bookId, 
      size: 1,
      setBooks: setContent});
  }, [pageParams]);
  
  const [ comments, setComments ] = useState(reviewHandler());

  console.log(content);

  return (
  <div className='bookContent'>
    {content.length && 
    <div className='inner'>
      <div className='title'>
        <div className='img'>
          <div className='bg'><img src={content[0].thumbnail} alt={content[0].title} /></div>
          <img src={content[0].thumbnail} alt={content[0].title} />
        </div>
        <div className='txt'>
          <p className='publisher'>{content[0].publisher}</p>
          <h2>{content[0].title}</h2>
          <p className='price'><strong>WON</strong> {content[0].price}</p>
          <p className='translators'>{content[0].translators.join(', ')}</p>
          <p className='authors'>{content[0].authors.join(', ')}</p>
        </div>
      </div>
      <div className='contents'>
        {content[0].contents.length > 0 ? content[0].contents+'... ' : <span className='noData'>도서 정보가 없습니다. </span>}<a href={content[0].url} target='_blank' rel='noreferrer' className='url'>상세보기</a></div>
    </div>
    }

    <hr />

    <div className='inner comment'>
      <h2>Review</h2>
      <Post posts={comments} setPosts={setComments} bookId={pageParams.bookId}></Post>
      <Comments posts={comments} setPosts={setComments} bookId={pageParams.bookId}></Comments>
    </div>
  </div>
  );
}