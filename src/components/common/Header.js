import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

export default function Header(props) {
  return (
    <header id='header' className={props.type}>
      <div className='subNav'>
        <div className='inner'>
          <ul>
            <li>
              <NavLink to={'/about'} activeClassName='on'>
              About
              </NavLink>
            </li>
            <li>
              <NavLink to={'/store'} activeClassName='on'>
              Store
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className='mainNav'>
        <div className='inner'>
          <nav id='gnb'>
            <h1>
              <li>
                <NavLink to={'/'} activeClassName='on'>
                Yujoo
                </NavLink>
              </li>
            </h1>
            <ul>
              <li>
                <NavLink to={'/book'} activeClassName='on'>
                Book
                </NavLink>
              </li>
              <li>
                <NavLink to={'/review'} activeClassName='on'>
                Review
                </NavLink>
              </li>
              <li>
                <NavLink to={'/photo'} activeClassName='on'>
                Photo
                </NavLink>
              </li>
              <li>
                <NavLink to={'/video'} activeClassName='on'>
                Video
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="navBtns">
            <span className='login'>
              <NavLink to={'/login'} activeClassName='on'>
              Login / Join
              </NavLink>
            </span>
            <span className='search'>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}