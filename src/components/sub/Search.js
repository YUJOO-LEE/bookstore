import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import * as types from '../../redux/actionType';
import Layout from '../common/Layout';
import Popup from '../common/Popup';

export default function Login() {

  const location = useLocation();
  const propKeyword = location.state?.q;
  const dispatch = useDispatch();
  const [ Keyword, setKeyword ] = useState(propKeyword || '');
  const [ IsKeywordNull, setIsKeywordNull ] = useState(false);
  const [ PopType, setPopType ] = useState('photo');
  const [ Index, setIndex ] = useState(0);
  const pop = useRef(null);
  const size = 5;

  const Books = useSelector(store => store.booksReducer.books.documents);
  const Pics = useSelector(store => store.flickrReducer.flickr.photo);
	const Vids = useSelector(store => store.youtubeReducer.youtube.items);

  useEffect(()=>{
    if (!Keyword) {
      setIsKeywordNull(true);
      return;
    }
    setIsKeywordNull(false);
    dispatch({
      type: types.BOOKS.start,
      Option: {query: Keyword,
        size: size}
    });
    dispatch({
      type: types.FLICKR.start,
      Option: {type: 'search',
        query: Keyword,
        size: size}
    });
    dispatch({
      type: types.YOUTUBE.start,
      Option: {query: Keyword,
        size: size}
    })
  }, [Keyword]);

  return (
  <>
    <Layout name='search'>
      <div className='searchBox'>
        <div className='inner'>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <form onSubmit={(e)=>{e.preventDefault(); setKeyword(e.target.search.value)}}>
            <input type='text'
              placeholder='검색어를 입력하세요'
              id='search'
              defaultValue={propKeyword}
            />
          </form>
        </div>
      </div>

      <div className='result'>
        <div className='inner'>
          <div className='books'>
            <h3>Search for books</h3>
            <ul>
              {IsKeywordNull ?
                <p className='noData'>검색어를 입력하세요.</p>
              : Books?.length ? Books?.map((data, idx)=>{
                return (
                  <li key={idx}>
                    <Link to={`/content/${data.isbn.split(' ')[0]}`}>
                      <p className='imgBox'>
                        <img src={data.thumbnail} alt={data.title} />
                      </p>
                      <p className='txtBox'>
                        <span>{data.title}</span>
                        <span>
                          {data.authors[0]}
                          {data.authors.length > 1 ? `외 ${data.authors.length - 1}명` : null}
                        </span>
                      </p>
                    </Link>
                  </li>
                );
              })
              : <p className='noData'>검색된 데이터가 없습니다.</p>
              }
            </ul>
          </div>

          <div className='photo'>
            <h3>Search on flickr</h3>
            <ul>
              {IsKeywordNull ?
                <p className='noData'>검색어를 입력하세요.</p>
              : Pics?.length ? Pics.map((data, idx)=>{
                return (
                  <li key={idx}
                    onClick={()=>{ pop.current.setOpen(true); setPopType('photo'); setIndex(idx)}}
                  >
                    <p className='imgBox'>
                      <img src={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`} alt={data.title} />
                    </p>
                    <p className='txtBox'>
                      <span>{data.title}</span>
                      <span>{data.owner}</span>
                    </p>
                  </li>
                );
              })
              : <p className='noData'>검색된 데이터가 없습니다.</p>
              }
            </ul>
          </div>

          <div className='video'>
            <h3>Search on YouTube</h3>
            <ul>
              {IsKeywordNull ?
                <p className='noData'>검색어를 입력하세요.</p>
              : Vids?.length ? Vids?.map((data, idx)=>{
                return (
                  <li key={idx}
                    onClick={()=>{ pop.current.setOpen(true); setPopType('video'); setIndex(idx)}}
                  >
                    <p className='imgBox'>
                      <img src={data.snippet.thumbnails.default.url} alt={data.snippet.title} />
                    </p>
                    <p className='txtBox'>
                      <span>{data.snippet.title}</span>
                      <span>{data.snippet.publishedAt.split('T')[0]}</span>
                    </p>
                  </li>
                );
              })
              : <p className='noData'>검색된 데이터가 없습니다.</p>
              }
            </ul>
          </div>
        </div>
      </div>
    </Layout>
    <Popup ref={pop}>
      {PopType === 'video' && Vids?.length && 
        <iframe title={Vids[Index].snippet.title} src={`https://www.youtube.com/embed/${Vids[Index].id.videoId}`} frameBorder='0'></iframe>
      }
      {PopType === 'photo' && Pics?.length &&
        <img src={`https://live.staticflickr.com/${Pics[Index].server}/${Pics[Index].id}_${Pics[Index].secret}_b.jpg`} alt={Pics[Index].title} />
      }
    </Popup>
  </>
  );
}