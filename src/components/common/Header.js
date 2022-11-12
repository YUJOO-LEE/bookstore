import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass, faX, faPenNib, faAt } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { NavLink, Link, useLocation, useHistory } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Anime from '../../asset/js/anime';

export default function Header(props) {
  const { pathname } = useLocation();
  const history = useHistory();

  // 메뉴 출력
  const Header = useRef(null);
  const [ scrollPosition, setScrollPosition ] = useState(1);
  const [ isHeaderOn, setHeaderOn ] = useState(true);
  const [ isScrollTop, setScrollTop ] = useState(true);

  // 모바일 메뉴
  const mobileNav = useRef(null);
  const [ isMobileNavOn, setMobileNav ] = useState(false);

  // 메뉴 별 컬러
  const figureColor = {
    book: ['#266A2E', '#593E1A'],
    review: ['#593E1A', '#6B78B4'],
    photo: ['#6B78B4', '#79BEDB'],
    video: ['#79BEDB', '#f5d547'],
    login: ['#f5d547', '#e38883'],
    about: ['#e38883', '#888'],
    store: ['#888', '#266A2E']
  };

  // 모바일 메뉴 노출
  const toggleMobileNav = (e)=>{
    e.preventDefault();
    !isMobileNavOn ? setMobileNav(true) : setMobileNav(false);
  }

  // 헤더 스크롤 이벤트
  const handleScroll = ()=>{
    const moving = window.scrollY || window.pageYOffset; 
    setScrollTop(moving < 100);
    if (moving > 100) {
      setHeaderOn(scrollPosition > moving);
      setScrollPosition(moving);
    }
  }

  // 스크롤 이벤트 부여
  useEffect(()=>{
    window.addEventListener('scroll', handleScroll);
    return (()=>{
      window.removeEventListener('scroll', handleScroll);
    });
  }, [scrollPosition]);


  // 페이지 이동 시 모바일 메뉴 비활성화, 스크롤 상단으로 이동
  useEffect(()=>{
    return (()=>{
      setMobileNav(false);
      new Anime(window, {
        prop: 'scroll',
        value: 0,
        duration: 300
      })
    });
  }, [pathname]);

  // 검색 이벤트
  const goSearch = (e)=>{
    e.preventDefault();
    history.push({
      pathname: '/search',
      state: {q: e.target.search.value}
    });
    e.target.search.value = '';
  }

  return (
    <header id='header' className={`${props.type} ${isHeaderOn && 'on'} ${isScrollTop && 'top'}`} ref={Header}>
      <div className='subNav'>
        <div className='inner'>
          <ul>
            <li>
              <NavLink to='/about'
                activeStyle={{color: figureColor.about[0]}}>
              About
              </NavLink>
            </li>
            <li>
              <NavLink to='/store'
                activeStyle={{color: figureColor.store[0]}}>
              Store
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className='mainNav'>
        <div className='inner'>
          <nav id='gnb'>
            <Link to='#' className='btnOpenMobileNav' onClick={toggleMobileNav}>
              <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
            </Link>
            <h1>
              <NavLink to='/'>
              <p>Yu</p>
              <p><span></span><span></span></p>
              <p>joo</p>
              </NavLink>
            </h1>
            <ul>
              <li>
                <NavLink to='/book'
                activeStyle={{color: figureColor.book[0]}}>
                Book
                </NavLink>
              </li>
              <li>
                <NavLink to='/review'
                activeStyle={{color: figureColor.review[0]}}>
                Review
                </NavLink>
              </li>
              <li>
                <NavLink to='/photo'
                activeStyle={{color: figureColor.photo[0]}}>
                Photo
                </NavLink>
              </li>
              <li>
                <NavLink to='/video'
                activeStyle={{color: figureColor.video[0]}}>
                Video
                </NavLink>
              </li>
            </ul>
            <Link to='/login' className='btnLogin'>
              <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
            </Link>
          </nav>

          <div className='navBtns'>
            <span className='login'>
              <NavLink to='/login' activeClassName='on'>
              Login / Join
              </NavLink>
            </span>
            <span className='search'>
              <Link to='/search'>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </Link>
            </span>
          </div>
        </div>
      </div>

      <div className={`mobileNav ${isMobileNavOn && 'on'}`} ref={mobileNav}>
        <h1>
          <NavLink to='/' activeClassName='on' className='logo'>
            <p>Yu</p>
            <p><span></span><span></span></p>
            <p>joo</p>
          </NavLink>
          <Link to='#' className='btnCloseMobileNav' onClick={toggleMobileNav}>
            <FontAwesomeIcon icon={faX}></FontAwesomeIcon>
          </Link>
        </h1>

        <div className='mobileSearch'>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <form onSubmit={goSearch}>
            <input type='text' placeholder='검색어를 입력하세요' id='search' />
          </form>
        </div>

        <ul className='mobileMainNav'>
          <li>
            <NavLink to='/book' activeClassName='on'>
            Book
            </NavLink>
          </li>
          <li>
            <NavLink to='/review' activeClassName='on'>
            Review
            </NavLink>
          </li>
          <li>
            <NavLink to='/photo' activeClassName='on'>
            Photo
            </NavLink>
          </li>
          <li>
            <NavLink to='/video' activeClassName='on'>
            Video
            </NavLink>
          </li>
        </ul>

        <ul className='mobileSubNav'>
          <li>
            <NavLink to='/about' activeClassName='on'>
            About
            </NavLink>
          </li>
          <li>
            <NavLink to='/store' activeClassName='on'>
            Store
            </NavLink>
          </li>
        </ul>

        <div className='address'>
          <div className='sns'>
            <span>
              <a href='https://github.com/YUJOO-LEE/bookstore' target='_blank'>
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </span>
            <span>
              <a href='https://leeyujoo.com' target='_blank'>
                <FontAwesomeIcon icon={faPenNib} />
              </a>
            </span>
            <span>
              <a href='mailto:lllllllllee@gmail.com' target='_blank'>
                <FontAwesomeIcon icon={faAt} />
              </a>
            </span>
          </div>

          <p>Garosu-gil, Gangnam-gu, Seoul, 43</p>
          <p>2022 Yujoo &copy; All Right reserved.</p>
        </div>
      </div>
    </header>
  );
}