import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPanorama, faBook, faFeather, faCameraRetro, faFilm } from '@fortawesome/free-solid-svg-icons';

export default function ScrollNavi(props) {

  return (
    <ul className='scrollNavi'>
      <li
        onClick={()=>props.setIndex(0)}
      >
        <FontAwesomeIcon icon={faPanorama}></FontAwesomeIcon>
        <span>Visual</span>
      </li>
      <li
        onClick={()=>props.setIndex(1)}
      >
        <FontAwesomeIcon icon={faBook}></FontAwesomeIcon>
        <span>Books</span>
      </li>
      <li
        onClick={()=>props.setIndex(2)}
      >
        <FontAwesomeIcon icon={faFeather}></FontAwesomeIcon>
        <span>Reviews</span>
      </li>
      <li
        onClick={()=>props.setIndex(3)}
      >
        <FontAwesomeIcon icon={faCameraRetro}></FontAwesomeIcon>
        <span>Photos</span>
      </li>
      <li
        onClick={()=>props.setIndex(4)}
      >
        <FontAwesomeIcon icon={faFilm}></FontAwesomeIcon>
        <span>Videos</span>
      </li>
    </ul>
  );
}