import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faPenNib, faAt } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  return (
    <footer id='footer'>
      <div className='footNav'>
        <div className='inner'>
          <p><span>Notice</span>Here Comes Title</p>
          <ul>
            <li>Book</li>
            <li>Review</li>
            <li>Photo</li>
            <li>Video</li>
            <li>About</li>
            <li>Location</li>
          </ul>
        </div>
      </div>
      <address>
        <div className='inner'>
          <h2>Yujoo</h2>
          <p>Garosu-gil, Gangnam-gu, Seoul, 43</p>
          <p>2022 Yujoo &copy; All Right reserved.</p>

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
        </div>
      </address>
    </footer>
  );
}