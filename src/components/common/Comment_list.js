import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as types from '../../redux/actionType';

export default function CommentsList({Posts, setPosts, bookId}) {

  const dispatch = useDispatch();
  const EditBookData = useSelector(store => store.bookSearchReducer.bookSearch);
  const [ Option, setOption ] = useState({});

  //const [ EditBookData, setEditBookData ] = useState(null);
  const [ CurPosts, setCurPosts ] = useState(Posts);
  const editBookList = useRef(null);
  const editBookId = useRef(null);
  const editThumbnail = useRef(null);
  const editTitle = useRef(null);
  const editContent = useRef(null);

  // post 수정
  const editPost = (index) => {
    const bookId = editBookId.current.value.trim();
    const title = editTitle.current.value.trim();
    const content = editContent.current.value.trim();
    const thumbnail = editThumbnail.current.value.trim();

    if (!bookId || !title || !content) return;

    setPosts(Posts.map((data)=>{
      if (data.id === index) {
        data.bookId = bookId;
        data.thumbnail = thumbnail;
        data.title = title;
        data.content = content;
        data.enableUpdate = false;
      }
      return data;
    }));
  };

  // 수정 input 활성화
  const enableUpdate = (index) => {
    setPosts(Posts.map((data)=>{
        if (data.id === index) {
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
    setPosts(Posts.map((data)=>{
        if (data.id === index) data.enableUpdate = false;
        return data;
      })
    );
  };

  // post 삭제
  const deletePost = (index) => {
    setPosts(Posts.filter((data)=> data.id !== (index)));
  };

  // 책 정보 검색
  const searchBook = (e)=>{
    editBookList.current?.classList.remove('off');
    const query = e.target.value.trim();
    if (!query) return;
    
    setOption({query: query, 
      size: 3});
  }

  // 도서 리스트 출력
  useEffect(() => {
    if (!Option.query) return;
    dispatch({
      type: types.BOOKSEARCH.start,
      Option: Option
    });
  }, [Option]);
  

  // 페이지 마운트 시 초기화
  useEffect(()=>{
    setPosts(Posts?.map((data)=>{
      data.enableUpdate = false;
      return data;
    }));
  }, []);

  useEffect(()=>{
    editBookList.current?.classList.add('off');
    // post 로컬 스토리지에 저장
    localStorage.setItem('post', JSON.stringify(Posts));

    // Posts 변동되면 CurPosts도 따라 변경
    if (bookId) {
      // bookId 있으면 filter 지정
      setCurPosts(Posts?.filter(data => data.bookId === bookId));
    } else {
      setCurPosts(Posts);
    }
  }, [Posts]);

  return (
    <div className='commentList'>
      {CurPosts?.length ? CurPosts.map((data, i)=>{
        return (
          <article key={i}>
            {data.enableUpdate
              ? <>
              <ul>
                <li className='txt edit'>
                  <input type='hidden' value={data.id} readOnly />
                  <input type='hidden' defaultValue={data.thumbnail} ref={editThumbnail}/>
                  <input type={bookId ? 'hidden' : 'text'} className='bookId' defaultValue={data.bookId} ref={editBookId} onInput={searchBook} />
                  {EditBookData?.length > 0 && 
                    <span className='bookList' ref={editBookList}>
                    {EditBookData.map((book, idx)=>{
                      return (
                        <span key={idx} onClick={()=>{
                          editThumbnail.current.value = book.thumbnail;
                          editBookId.current.value = book.isbn.split(' ')[0];
                          editBookList.current.classList.add('off');
                        }}>
                          <span>{book.title}</span>
                          <span className='authors'>{book.authors[0]}</span>
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
                  <button className='btnCancle' onClick={()=>{disableUpdate(data.id)}}>Calcle</button>
                  <button className='btnUpdate' onClick={()=>{editPost(data.id)}}>Update</button>
                </li>
              </ul>
              </>
              : <>
              <ul className={!bookId ? 'listAll': null}>
                {!bookId && 
                  <li className='img'>
                    <Link to={`/content/${data.bookId}`}>
                      <img src={data.thumbnail} />
                    </Link>
                  </li>
                }
                <li className='txt'>
                  <h3>{data.title}</h3>
                  <p>{data.content}</p>
                </li>
                <li className={`btns ${!bookId && 'listAll'}`}>
                  <button className='btnEdit' onClick={()=>{enableUpdate(data.id)}}>Edit</button>
                  <button className='btnDelete' onClick={()=>{deletePost(data.id)}}>Delete</button>
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