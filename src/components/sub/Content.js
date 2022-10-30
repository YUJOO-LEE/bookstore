import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as types from '../../redux/actionType';
import CommentsList from '../common/Comment_list';
import CommentPost from '../common/Comment_post';

export default function Content() {

  const getLocalData = () => {
    const dummyPosts = [
      { id:6, title: 'REVIEW01', content: 'HERE COMES DESCRIPTION IN DETAILS.', bookId: '8932909342', thumbnail: 'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F507004%3Ftimestamp%3D20221011180529'},
      { id:5, title: 'REVIEW02', content: 'HERE COMES DESCRIPTION IN DETAILS.', bookId: '8932921148', thumbnail: 'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5800913%3Ftimestamp%3D20221011191141'},
      { id:4, title: 'REVIEW03', content: 'HERE COMES DESCRIPTION IN DETAILS.', bookId: '8901255715', thumbnail: 'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5958026%3Ftimestamp%3D20221011180345'},
      { id:3, title: 'REVIEW04', content: 'HERE COMES DESCRIPTION IN DETAILS.', bookId: '1196372144', thumbnail: 'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F4887891%3Ftimestamp%3D20221011190109'},
      { id:2, title: 'REVIEW05', content: 'HERE COMES DESCRIPTION IN DETAILS.', bookId: '8956055467', thumbnail: 'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F724120%3Ftimestamp%3D20221011183110'},
      { id:1, title: 'REVIEW06', content: 'HERE COMES DESCRIPTION IN DETAILS.', bookId: '8932921148', thumbnail: 'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5800913%3Ftimestamp%3D20221011191141'}
    ]

    // 로컬 스토리지 데이터 불러오기
    let data = localStorage.getItem('post');
    // 로컬 데이터 없으면 더미 데이터 넣기
    data = data ? JSON.parse(data) : dummyPosts;
    return data;
  }
  
  const dispatch = useDispatch();
	const pageParams = useParams();
  const ContentData = useSelector(store => store.contentReducer.content[0]);
  //const [ Option, setOption ] = useState({});
  const [ CommentsData, setCommentsData ] = useState(getLocalData());
  
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