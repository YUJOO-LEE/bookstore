import { useEffect, useRef, useState } from 'react';
import Layout from '../common/Layout';

export default function Review() {

  return (
    <Layout name='review'>
    <div className='inner'>
      <div className='form'>
        <p className='title'>
          <input type='text' id='title' pattern='.*\S.*' ref={inputTitle} onInput={checkTyped} />
          <label htmlFor='title'>Title</label>
        </p>
        <p className='content'>
          <input type='text' id='content' pattern='.*\S.*' ref={inputContent} onInput={checkTyped} />
          <label htmlFor='content'>Content</label>
        </p>
        <div className='btns'>
          <button className='btnReset' onClick={resetForm}>Reset</button>
          <button className='btnSubmit' onClick={createPost}>Submit</button>
        </div>
      </div>

      <div className='listBox'>
        {posts.length && posts.map((data, i)=>{
          return (
            <article key={i}>
              {data.enableUpdate
                ? <>
                <ul>
                  <li className='txt edit'>
                    <input
                    type='text'
                    defaultValue={data.title} 
                    ref={editTitle}  onInput={checkTyped}
                    />
                    <input
                    type='text'
                    defaultValue={data.content} 
                    ref={editContent}  onInput={checkTyped}
                    />
                  </li>
                  <li className='btns edit'>
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
    </div>
    </Layout>
  );
}