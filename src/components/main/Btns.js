import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPanorama, faBook, faFeather, faCameraRetro, faFilm, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export default function Btns(props) {
  return (
    <ul className='scrollNavi'>
      <li
        onClick={()=>props.setIndex(0)}
      >
        <FontAwesomeIcon icon={faPanorama}></FontAwesomeIcon>
        Visual
      </li>
      <li
        onClick={()=>props.setIndex(1)}
      >
        <FontAwesomeIcon icon={faBook}></FontAwesomeIcon>
        Books
      </li>
      <li
        onClick={()=>props.setIndex(2)}
      >
        <FontAwesomeIcon icon={faFeather}></FontAwesomeIcon>
        Reviews
      </li>
      <li
        onClick={()=>props.setIndex(3)}
      >
        <FontAwesomeIcon icon={faCameraRetro}></FontAwesomeIcon>
        Photos
      </li>
      <li
        onClick={()=>props.setIndex(4)}
      >
        <FontAwesomeIcon icon={faFilm}></FontAwesomeIcon>
        Videos
      </li>
      {/* <li
        onClick={()=>props.setIndex(5)}
      >
        <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
        Subscribe
      </li> */}
    </ul>
  );
}