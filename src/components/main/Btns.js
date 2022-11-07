import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPanorama, faBook, faFeather, faCameraRetro, faFilm } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function Btns(props) {
  const [ Change, setChange ] = useState(true);

  return (
    <>
      <button
        style={{position: 'absolute', top: 0, right: 0, zIndex: 9999}}
        onClick={()=>setChange(!Change)}
      >
        <span>Change</span>
      </button>

      <ul className={`scrollNavi ${Change ? 'one': 'two'}`}>
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
    </>
  );
}