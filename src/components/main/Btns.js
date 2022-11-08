import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faFlickr, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faHeart, faImages, faMap, faPenToSquare } from '@fortawesome/free-regular-svg-icons';


function Btns() {
  return (
    <section id='btns'>
      <div className='inner'>
        <ul>
          <li>
            <a href='https://github.com/YUJOO-LEE/bookstore' target='_blank'>
              <span>
                <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
              </span>
              <span>Github</span>
            </a>
          </li>
          <li>
            <a href='https://leeyujoo.com' target='_blank'>
              <span>
                <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
              </span>
              <span>Blog</span>
            </a>
          </li>
          <li>
            <a href='mailto:lllllllllee@gmail.com' target='_blank'>
              <span>
                <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
              </span>
              <span>E-mail</span>
            </a>
          </li>
          <li>
            <Link to='/about'>
              <span>
                <FontAwesomeIcon icon={faMap}></FontAwesomeIcon>
              </span>
              <span>about</span>
            </Link>
          </li>
          <li>
            <Link to='/book'>
              <span>
                <FontAwesomeIcon icon={faBook}></FontAwesomeIcon>
              </span>
              <span>book</span>
            </Link>
          </li>
          <li>
            <Link to='/review'>
              <span>
                <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
              </span>
              <span>Review</span>
            </Link>
          </li>
          <li>
            <Link to='/photo'>
              <span>
                <FontAwesomeIcon icon={faImages}></FontAwesomeIcon>
              </span>
              <span>Filckr</span>
            </Link>
          </li>
          <li>
            <Link to='/video'>
              <span>
                <FontAwesomeIcon icon={faYoutube}></FontAwesomeIcon>
              </span>
              <span>Youtube</span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Btns