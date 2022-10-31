import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as types from '../../redux/actionType';
import CommentsList from '../common/Comment_list';
import CommentPost from '../common/Comment_post';

export default function Content() {
  
  const dispatch = useDispatch();
	const pageParams = useParams();
  const ContentData = useSelector(store => store.contentReducer.content[0]);
  const [ CommentsData, setCommentsData ] = useState(JSON.parse(localStorage.getItem('post')));
  
  // 책 정보 출력
  useEffect(()=>{
    dispatch({
      type: types.CONTENT.start,
      Option: {
        query: pageParams.bookId, 
        size: 1
      }
    });
  }, []);

  return (
  <div className='bookContent'>
    {ContentData && 
    <div className='inner'>
      <div className='title'>
        <div className='img'>
          <div className='bg'><img src={ContentData.thumbnail} alt={ContentData.title} /></div>
          <img src={ContentData.thumbnail} alt={ContentData.title} />
        </div>
        <div className='txt'>
          <p className='publisher'>{ContentData.publisher}</p>
          <h2>{ContentData.title}</h2>
          <p className='price'><strong>WON</strong> {ContentData.price}</p>
          <p className='translators'>{ContentData.translators.join(', ')}</p>
          <p className='authors'>{ContentData.authors.join(', ')}</p>
        </div>
      </div>
      <div className='contents'>
        {ContentData.contents.length > 0 ? ContentData.contents+'... ' : <span className='noData'>도서 정보가 없습니다. </span>}<a href={ContentData.url} target='_blank' rel='noreferrer' className='url'>상세보기</a></div>
    </div>
    }

    <hr />

    <div className='inner comment'>
      <h2>Review</h2>
      <CommentPost Posts={CommentsData} setPosts={setCommentsData} bookId={pageParams.bookId}></CommentPost>
      <CommentsList Posts={CommentsData} setPosts={setCommentsData} bookId={pageParams.bookId}></CommentsList>
    </div>
  </div>
  );
}