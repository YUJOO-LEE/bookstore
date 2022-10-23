import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

export default function Visual() {
  return (
    <figure className='mainSlider'>
      <div className='slide'>
        <ul>
          <li>
            <div className='inner'>
              <h2>In the end,<br/>we'll all become <span>stories</span></h2>
              <p>Whether you’re preparing for class, getting Flyer gear for a game,<br/>or decorating your space, Yujoo Bookstore has what you need.</p>
            </div>
          </li>
          <li>
            <div className='inner'>
              <h2>A reader lives a <span>thousand</span> lives before he dies</h2>
              <p>The first floor houses clothing, gifts, school and office supplies, stationary, and more.<br/>You’ll find textbooks and course materials on the second floor.</p>
            </div>
          </li>
          <li>
            <div className='inner'>
              <h2>Today a reader, tomorrow a <span>leader</span></h2>
              <p>We promote the common good through a dedication to student success,<br/>school spirit, and world class customer service.</p>
            </div>
          </li>
        </ul>
      </div>
      <div className='inner'>
        <span className='prev'>
          <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
        </span>
        <span className='next'>
          <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
        </span>
      </div>
    </figure>
  );
}