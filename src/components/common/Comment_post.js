import { useEffect, useRef, useState } from 'react';
import Search from '../../asset/search';

export default function Post({posts, setPosts, bookId}){

  const bookList = useRef(null);
  const inputBookId = useRef(null);
  const inputTitle = useRef(null);
  const inputContent = useRef(null);
  const [ bookData, setBookData ] = useState(null);
  //const [ bookThumbnail, setBookThumbnail ] = useState(null);


  // form 리셋
  const resetForm = () => {
    if (inputBookId.current !== null) {
      inputBookId.current.value = '';
      inputBookId.current.classList.remove('typed');
    }
    if (inputTitle.current !== null) {
      inputTitle.current.value = '';
      inputTitle.current.classList.remove('typed');
    }
    if (inputContent.current !== null) {
      inputContent.current.value = '';
      inputContent.current.classList.remove('typed');
    }
    bookList.current?.classList.add('off');
  };

  // 신규 post 추가
  const createPost = () => {
    const id = posts[0].id + 1;
    const bookId = inputBookId.current.value.trim();
    const title = inputTitle.current.value.trim();
    const content = inputContent.current.value.trim();

    const search = async ()=>{
      const bookThumbnail = await Search({query: bookId, size:1});
      
      setPosts([
        { 'id': id, 'title': title, 'content': content, 'bookId': bookId, 'thumbnail': bookThumbnail[0].thumbnail},
        ...posts
      ])
    }
    search();

    if (!bookId || !title || !content) return;


    resetForm();
  };

  // 책 정보 검색
  const searchBook = (e)=>{
    checkTyped(e);
    bookList.current?.classList.remove('off');
    const keyword = inputBookId.current.value.trim();
    const search = async ()=>{
      setBookData( await Search({query: keyword, size: 3}));
    }
    search();
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


  // 언마운트 시 input 초기화
  useEffect(()=>{
    return (resetForm);
  }, []);

  return (
    <div className='commentForm'>
      {bookId 
      ? <input type='hidden' id='bookId' ref={inputBookId} value={bookId} readOnly />

      : <p className='bookId'>
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
                  <span className='authors'>{book.authors[0]}</span>
                </span>
              );
            })}
            </span>
          }
        </p>
      }
      
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