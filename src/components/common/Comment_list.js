import { useEffect, useRef, useState } from 'react';
import Search from '../common/Search';

export default function Comments({posts, setPosts, bookId}) {
  const curPosts = bookId ?
  posts.filter(data => data.bookId === bookId) : posts;
  const editBookList = useRef(null);
  const editBookId = useRef(null);
  const editTitle = useRef(null);
  const editContent = useRef(null);
  const [ editBookData, setEditBookData ] = useState(null);


  // post 수정
  const editPost = (index) => {
    const bookId = editBookId.current.value.trim();
    const title = editTitle.current.value.trim();
    const content = editContent.current.value.trim();

    if (!bookId || !title || !content) return;

    setPosts(posts.map((data, i)=>{
      if (i === index) {
        data.bookId = bookId;
        data.title = title;
        data.content = content;
        data.enableUpdate = false;
      }
      return data;
    }));
  };

  // 수정 input 활성화
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

  // 수정 input 비활성화
  const disableUpdate = (index) => {
    setPosts(posts.map((data, i)=>{
        if (i === index) data.enableUpdate = false;
        return data;
      })
    );
  };

  // post 삭제
  const deletePost = (index) => {
    setPosts(posts.filter((_, i)=> i !== (index)));
  };

  // 책 정보 검색
  const searchBook = (e)=>{
    editBookList.current?.classList.remove('off');
    const keyword = e.target.value.trim();
    const search = async ()=>{
      setEditBookData( await Search(keyword));
      console.log(editBookList);
    }
    search();
  }
  
  // post 로컬 스토리지에 저장
  useEffect(()=>{
    localStorage.setItem('post', JSON.stringify(posts));
  }, [posts]);

  return (
    <div className='commentList'>
      {curPosts.length > 0 ? curPosts.map((data, i)=>{
        return (
          <article key={i}>
            {data.enableUpdate
              ? <>
              <ul>
                <li className='txt edit'>
                  <input type='text' className='bookId' defaultValue={data.bookId} ref={editBookId} onInput={searchBook} />
                  {editBookData?.length > 0 && 
                    <span className='bookList' ref={editBookList}>
                    {editBookData.map((book, idx)=>{
                      return (
                        <span key={idx} onClick={()=>{
                          editBookId.current.value = book.isbn.split(' ')[0];
                          editBookList.current.classList.add('off');
                        }}>
                          <span>{book.title}</span>
                          <span>{book.authors[0]}</span>
                        </span>
                      );
                    })}
                    </span>
                  }
                  <input
                  type='text' className='title'
                  defaultValue={data.title} 
                  ref={editTitle}
                  />
                  <input
                  type='text' className='content'
                  defaultValue={data.content} 
                  ref={editContent}
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
        })
      : <p className='noData'>작성된 리뷰가 없습니다.</p>
      }
    </div>
  );
}