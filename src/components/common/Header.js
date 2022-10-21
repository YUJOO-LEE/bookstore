import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  return (
    <header id='header'>
      <div className='subNav'>
        <div className='inner'>
          <ul>
            <li>About</li>
            <li>Location</li>
          </ul>
        </div>
      </div>
      <div className='mainNav'>
        <div className='inner'>
          <nav id='gnb'>
            <h1>Yujoo</h1>
            <ul>
              <li>Book</li>
              <li>Review</li>
              <li>Photo</li>
              <li>Video</li>
            </ul>
          </nav>

          <div className="navBtns">
            <span className='login'>
              Login / Join
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