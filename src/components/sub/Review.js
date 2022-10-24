import { useEffect, useRef, useState } from 'react';
import Layout from '../common/Layout';

export default function Review() {

  const getLocalData = () => {
    const dummyPosts = [
      { title: 'TITLE01', content: "HERE COMES DESCRIPTION IN DETAILS."},
      { title: 'TITLE02', content: "HERE COMES DESCRIPTION IN DETAILS."},
      { title: 'TITLE03', content: "HERE COMES DESCRIPTION IN DETAILS."},
      { title: 'TITLE04', content: "HERE COMES DESCRIPTION IN DETAILS."},
      { title: 'TITLE05', content: "HERE COMES DESCRIPTION IN DETAILS."},
      { title: 'TITLE06', content: "HERE COMES DESCRIPTION IN DETAILS."}
    ]

    // 로컬 스토리지 데이터 불러오기
    let data = localStorage.getItem('post');
    // 로컬 데이터 없으면 더미 데이터 넣기
    data = data ? JSON.parse(data) : dummyPosts;
    return data;
  }
  const inputTitle = useRef(null);
  const inputContent = useRef(null);
  const editTitle = useRef(null);
  const editContent = useRef(null);

  const [ posts, setPosts ] = useState(getLocalData());

  const resetForm = () => {
    inputTitle.current.value = '';
    inputContent.current.value = '';
  };

  const createPost = () => {
    const title = inputTitle.current.value.trim();
    const content = inputContent.current.value.trim();

    if (!title || !content) return;

    setPosts([
      {"title": title, "content": content},
      ...posts
    ])

    resetForm();
  };

  const editPost = (index) => {
    const title = editTitle.current.value.trim();
    const content = editContent.current.value.trim();

    if (!title || !content) return;

    setPosts(posts.map((data, i)=>{
      if (i === index) {
        data.title = title;
        data.content = content;
        data.enableUpdate = false;
      }
      return data;
    }));
  };

  const enableUpdate = (index) => {
    setPosts(posts.map((data, i)=>{
        if (i === index) {
          data.enableUpdate = true;
        } else {
          data.enableUpdate = false;
        };
        return data;
      })
    );
  };

  const disableUpdate = (index) => {
    setPosts(posts.map((data, i)=>{
        if (i === index) data.enableUpdate = false;
        return data;
      })
    );
  };

  const deletePost = (index) => {
    setPosts(posts.filter((_, i)=> i !== (index)));
  };

  const checkTyped = (e)=>{
    if (e.target.value.length) {
      e.target.classList.add('typed');
    } else {
      e.target.classList.remove('typed');
    }
  };

  useEffect(()=>{
    localStorage.setItem('post', JSON.stringify(posts));
  }, [posts])

  return (
    <Layout name='review'>
    <div className='form'>
      <p className='title'>
        <input type='text' id='title' pattern=".*\S.*" ref={inputTitle} onInput={checkTyped} />
        <label htmlFor='title'>Title</label>
      </p>
      <p className='content'>
        <input type='text' id='content' pattern=".*\S.*" ref={inputContent} onInput={checkTyped} />
        <label htmlFor='content'>Content</label>
      </p>
      <button className='btnReset' onClick={resetForm}>Reset</button>
      <button className='btnSubmit' onClick={createPost}>Submit</button>
    </div>

    <div className="listBox">
      {posts.length && posts.map((data, i)=>{
        return (
          <article key={i}>
            {data.enableUpdate
              ? <>
              <ul>
                <li className='txt edit'>
                  <input
                  type="text"
                  defaultValue={data.title} 
                  ref={editTitle}  onInput={checkTyped}
                  />
                  <input
                  type="text"
                  defaultValue={data.content} 
                  ref={editContent}  onInput={checkTyped}
                  />
                </li>
                <li className='btns'>
                  <button className='btnCancle' onClick={()=>{disableUpdate(i)}}>Calcle</button>
                  <button className='btnUpdate' onClick={()=>{editPost(i)}}>Update</button>
                </li>
              </ul>
              </>
              : <>
              <ul>
                <li className='txt'>
                  <h3>{data.title}</h3>
                  <p>{data.content}</p>
                </li>
                <li className='btns'>
                  <button className='btnEdit' onClick={()=>{enableUpdate(i)}}>Edit</button>
                  <button className='btnDelete' onClick={()=>{deletePost(i)}}>Delete</button>
                </li>
              </ul>
              </>
              }
          </article>
        );
      })}
    </div>
    </Layout>
  );
}