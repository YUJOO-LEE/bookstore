import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass, faX, faPenNib, faAt } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { NavLink, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

export default function Header(props) {

  // 헤더
  const Header = useRef(null);
  const [ scrollPosition, setScrollPosition ] = useState(1);
  const [ isHeaderOn, setHeaderOn ] = useState(true);
  const [ isScrollTop, setScrollTop ] = useState(true);

  // 모바일 메뉴
  const mobileNav = useRef(null);
  const [ isMobileNavOn, setMobileNav ] = useState(false);

  // 모바일 메뉴 노출
  const toggleMobileNav = (e)=>{
    e.preventDefault();
    !isMobileNavOn ? setMobileNav(true) : setMobileNav(false);
  }

  // 헤더 스크롤 이벤트
  const handleScroll = ()=>{
    const moving = window.scrollY; 
    setScrollTop(moving < 100);
    setHeaderOn(scrollPosition > moving);
    setScrollPosition(moving);
  }

  useEffect(()=>{
    window.addEventListener('scroll', handleScroll)
    return (()=>{
      window.removeEventListener('scroll', handleScroll)
    });
  }, [scrollPosition]);

  return (
    <header id='header' className={`${props.type} ${isHeaderOn && 'on'} ${isScrollTop && 'top'}`} ref={Header}>
      <div className='subNav'>
        <div className='inner'>
          <ul>
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
        </div>
      </div>
      <div className='mainNav'>
        <div className='inner'>
          <nav id='gnb'>
            <Link to='#' className='btnOpenMobileNav' onClick={toggleMobileNav}>
              <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
            </Link>
            <h1>
              <NavLink to='/' activeClassName='on'>
              <p>Yu</p>
              <p><span></span><span></span></p>
              <p>joo</p>
              </NavLink>
            </h1>
            <ul>
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
            <Link to='/login' className='btnLogin'>
              <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
            </Link>
          </nav>

          <div className="navBtns">
            <span className='login'>
              <NavLink to='/login' activeClassName='on'>
              Login / Join
              </NavLink>
            </span>
            <span className='search'>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
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
          <input type="text" placeholder='검색어를 입력하세요' />
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
              <FontAwesomeIcon icon={faGithub} />
            </span>
            <span>
              <FontAwesomeIcon icon={faPenNib} />
            </span>
            <span>
              <FontAwesomeIcon icon={faAt} />
            </span>
          </div>

          <p>Garosu-gil, Gangnam-gu, Seoul, 43</p>
          <p>2022 Yujoo &copy; All Right reserved.</p>
        </div>
      </div>
    </header>
  );
}