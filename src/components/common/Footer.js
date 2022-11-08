import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faPenNib, faAt } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <footer id='footer'>
      <div className='footNav'>
        <div className='inner'>
          <p><span>Notice</span>Here Comes Title</p>
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
      <address>
        <div className='inner'>
          <h2>
            <NavLink to='/'>
            <p>Yu</p>
            <p><span></span><span></span></p>
            <p>joo</p>
            </NavLink>
          </h2>
          <p>Garosu-gil, Gangnam-gu, Seoul, 43</p>
          <p>2022 Yujoo &copy; All Right reserved.</p>

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
        </div>
      </address>
    </footer>
  );
}