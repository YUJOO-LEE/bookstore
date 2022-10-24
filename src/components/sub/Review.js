import Layout from '../common/Layout';
import Comments from '../common/Comment_list';
import Post from '../common/Comment_post';
import { useState } from 'react';


export default function Review() {

  const getLocalData = () => {
    const dummyPosts = [
      { title: 'TITLE01', content: 'HERE COMES DESCRIPTION IN DETAILS.', bookId: '8932909342'},
      { title: 'TITLE02', content: 'HERE COMES DESCRIPTION IN DETAILS.', bookId: '8932909342'},
      { title: 'TITLE03', content: 'HERE COMES DESCRIPTION IN DETAILS.', bookId: '8932909342'},
      { title: 'TITLE04', content: 'HERE COMES DESCRIPTION IN DETAILS.', bookId: '8932909342'},
      { title: 'TITLE05', content: 'HERE COMES DESCRIPTION IN DETAILS.', bookId: '8932909342'},
      { title: 'TITLE06', content: 'HERE COMES DESCRIPTION IN DETAILS.', bookId: '8932909342'}
    ]

    // 로컬 스토리지 데이터 불러오기
    let data = localStorage.getItem('post');
    // 로컬 데이터 없으면 더미 데이터 넣기
    data = data ? JSON.parse(data) : dummyPosts;
    return data;
  }

  const [ posts, setPosts ] = useState(getLocalData());

  return (
    <Layout name='review'>
    <div className='inner'>
      <Post posts={posts} setPosts={setPosts}></Post>
      <Comments posts={posts} setPosts={setPosts}></Comments>
    </div>
    </Layout>
  );
}