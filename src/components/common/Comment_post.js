import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as types from '../../redux/actionType';

export default function CommentPost({Posts, setPosts, bookId}){

  const dispatch = useDispatch();
  const BookSearchData = useSelector(store => store.bookSearchReducer.bookSearch);
  const [ Option, setOption ] = useState({});

  const bookList = useRef(null);
  const inputBookId = useRef(null);
  const inputTitle = useRef(null);
  const inputContent = useRef(null);
  const inputThumbnail = useRef(null);


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
    const id = Posts[0].id + 1;
    const bookId = inputBookId.current.value.trim();
    const title = inputTitle.current.value.trim();
    const content = inputContent.current.value.trim();
    const thumbnail = inputThumbnail.current.value.trim();

    if (!bookId || !title || !content) return;

    setPosts([
      { 'id': id, 'title': title, 'content': content, 'bookId': bookId, 'thumbnail': thumbnail},
      ...Posts
    ])
    
    resetForm();
  };

  // 책 검색 옵션 변경
  const searchBook = (e) => {
    checkTyped(e);
    bookList.current?.classList.remove('off');
    const query = e.target.value.trim();
    if (!query) return;

    setOption({query: query, 
      size: 3});
  };

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
    localStorage.setItem('post', JSON.stringify(Posts));
  }, [Posts]);

  // 도서 리스트 출력
  useEffect(() => {
    if (!Option.query) return;
    dispatch({
      type: types.BOOKSEARCH.start,
      Option: Option
    });
  }, [Option]);

  // bookId 값 있으면 해당 정보 받아오기(content 페이지일때)
  useEffect(() => {
    if (!bookId) return;
    dispatch({
      type: types.BOOKSEARCH.start,
      Option: {query: bookId, size: 1}
    });
  }, []);

  // 언마운트 시 input 초기화
  useEffect(()=>{
    return (resetForm);
  }, []);

  return (
    <div className='commentForm'>
      <input type='hidden' id='thumbnail' ref={inputThumbnail} defaultValue={BookSearchData[0]?.thumbnail} />

      {bookId 
      ? <input type='hidden' id='bookId' ref={inputBookId} value={bookId} readOnly />
      : <p className='bookId'>
          <input type='text' id='bookId' pattern='.*\S.*' ref={inputBookId} onInput={searchBook} value={bookId} className={bookId ? 'typed' : null} />
          <label htmlFor='bookId'>Search book</label>
          {inputBookId.current?.value && 
            <span className='bookList' ref={bookList}>
            {BookSearchData?.map((book, idx)=>{
              return (
                <span key={idx} onClick={()=>{
                  inputBookId.current.value = book.isbn.split(' ')[0];
                  inputThumbnail.current.value = book.thumbnail;
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