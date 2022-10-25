import { useEffect, useRef, useState } from 'react';
import Search from '../common/Search';

export default function Post({posts, setPosts, bookId}){

  const bookList = useRef(null);
  const inputBookId = useRef(null);
  const inputTitle = useRef(null);
  const inputContent = useRef(null);
  const [ bookData, setBookData ] = useState(null);


  // form 리셋
  const resetForm = () => {
    inputBookId.current.value = '';
    inputTitle.current.value = '';
    inputContent.current.value = '';
    inputBookId.current.classList.remove('typed');
    inputTitle.current.classList.remove('typed');
    inputContent.current.classList.remove('typed');
  };

  // 신규 post 추가
  const createPost = () => {
    const bookId = inputBookId.current.value.trim();
    const title = inputTitle.current.value.trim();
    const content = inputContent.current.value.trim();

    if (!bookId || !title || !content) return;

    setPosts([
      {'bookId': bookId, 'title': title, 'content': content},
      ...posts
    ])

    resetForm();
  };

  // 책 정보 검색
  const searchBook = (e)=>{
    checkTyped(e);
    bookList.current?.classList.remove('off');
    const keyword = inputBookId.current.value.trim();
    const search = async ()=>{
      setBookData( await Search(keyword));
    }
    search()
    console.log(bookData);
  }

  // input 입력 여부 확인
  const checkTyped = (e)=>{
    if (e.target.value.length) {
      e.target.classList.add('typed');
    } else {
      e.target.classList.remove('typed');
    }
  };

  // post 로컬 스토리지에 저장
  useEffect(()=>{
    localStorage.setItem('post', JSON.stringify(posts));
  }, [posts]);

  return (
    <div className='commentForm'>
      <p className='bookId'>
        <input type='text' id='bookId' pattern='.*\S.*' ref={inputBookId} onInput={searchBook} value={bookId} className={bookId ? 'typed' : null} />
        <label htmlFor='bookId'>Search book</label>
        {bookData?.length > 0 && 
          <span className='bookList' ref={bookList}>
          {bookData.map((book, idx)=>{
            return (
              <span key={idx} onClick={()=>{
                inputBookId.current.value = book.isbn.split(' ')[0];
                bookList.current.classList.add('off');
              }}>
                <span>{book.title}</span>
                <span>{book.authors[0]}</span>
              </span>
            );
          })}
          </span>
        }
      </p>
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
  );
}