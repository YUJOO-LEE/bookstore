import Layout from '../common/Layout';
import CommentsList from '../common/Comment_list';
import CommentPost from '../common/Comment_post';
import { useState } from 'react';


export default function Review() {

  const [ Posts, setPosts ] = useState(JSON.parse(localStorage.getItem('post')));

  return (
    <Layout name='review'>
      <div className='inner'>
        <CommentPost Posts={Posts} setPosts={setPosts}></CommentPost>
        <CommentsList Posts={Posts} setPosts={setPosts}></CommentsList>
      </div>
    </Layout>
  );
}