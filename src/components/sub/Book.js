import Layout from '../common/Layout';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as types from '../../redux/actionType';

export default function Book() {

  const dispatch = useDispatch();
  const categories = ['책', '테크', '브랜딩', '인문학'];
  const Books = useSelector(store => store.booksReducer.books.documents);
	const TotalCount = useSelector(store => store.booksReducer.books.meta?.total_count);
  const [ Option, setOption ] = useState(categories[0]);
  const [ Loading, setLoading ] = useState(true);
  const [ IsClickable, setClickable ] = useState(true);
  const frame = useRef(null);

  // 책 검색 옵션 변경
  const searchBook = (query) => {
    if (!IsClickable) return;
    setLoading(true);

    setOption({query: query, 
      size: 24});
  };
  
  // 리스트 출력
  useEffect(() => {
    if (!Option.query) return;
    dispatch({
      type: types.BOOKS.start,
      Option: Option
    });
  }, [Option]);

  // 로딩 이미지 노출에 대한 frame 효과 처리
  useEffect(()=>{
    if (Loading) {
      setClickable(false);
      frame.current?.classList.remove('on');
    } else {
      setClickable(true);
      frame.current?.classList.add('on');
    }
  });

  // 데이터 변경 시 로딩 효과 전환
  useEffect(()=>{
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, [Books]);
  
  // 기본 데이터 뿌려주기
  useEffect(()=>{
    searchBook(categories[0]);
  }, []);

  return (
    <Layout name='book'>
    <div className='inner'>
      {Loading && 
        <div className='loading'></div>
      }
      <div className='searchBox'>
        <ul>
          {categories.map((cate, idx)=>{
            return (
              <li key={idx}
                onClick={()=>{searchBook(cate)}}
                className={Option.query === cate ? 'on' : null}
              >#{cate}</li>
            )
          })}
        </ul>
        <p className='articleTotal'>
          <span>총 {TotalCount}개</span>
          <span className='provided'>
            <span>provided by</span>
            <a href='https://developers.kakao.com/' target='_blank' rel='noopener noreferrer'>
              <img src={process.env.PUBLIC_URL + '/img/kakao.png'} alt='kakao' />
            </a>
          </span>
        </p>
      </div>

      <div className='frame' ref={frame}>
        {Books ? Books.map((item, idx)=>{
          return(
          <article key={idx}>
            <div className='imgBox'>
            <Link to={`/content/${item.isbn.split(' ')[0]}`}>
              <div className='bg'>
                <img src={item.thumbnail} alt={item.title} />
              </div>
              <div className='title'>
                <p>{item.publisher}</p>
                <h3>{item.title}</h3>
              </div>
              <div className='pic'>
                <img src={item.thumbnail} alt={item.title} />
              </div>
            </Link>
            </div>
            {item.status === '정상판매' ? <p className='onSale on'>구매가능</p> : <p className='onSale'>구매불가</p>}
            <div className='txtBox'>
              <p className='desc'>
                {item.contents}
              </p>
              <p className='author'>
                {item.authors[0]}
                {item.authors.length > 1 ? `외 ${item.authors.length - 1}명` : null}
              </p>
            </div>
          </article>
        )})
        : <div className='noData'>검색된 데이터가 없습니다.</div>
        }
      </div>
    </div>
    </Layout>
  );
}