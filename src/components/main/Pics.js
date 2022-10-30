import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../redux/actionType';
import Popup from '../common/Popup';

export default function Pics() {

  const dispatch = useDispatch();
  const Pics = useSelector(store => store.flickrReducer.flickr.photo);
  const [ Index, setIndex ] = useState(0);
  const frame = useRef(null);
  const pop = useRef(null);

  useEffect(() => {
    dispatch({
      type: types.FLICKR.start,
      Option: {type: 'interest', size: 5}
    });
  }, [])

  return (
    <section id='Pics' className='myScroll'>
      <div className='inner'>
        <h2>Pics</h2>

        <div className='frame' ref={frame}>
          {Pics ? Pics.map((item, idx)=>{
            return (
              <article key={idx}>
                <div className='pic' onClick={()=>{
                  pop.current.setOpen(true);
                  setIndex(idx);
                  }}>
                  <img src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_w.jpg`} alt={item.title} />
                </div>
                <div className="txt">
                  <h3>{item.title}</h3>
                  <div className='profile'>
                    <img src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`} alt={item.owner} onError={(e)=>{
                      e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif');
                    }} />
                    <span onClick={()=>{
                      //showFlickr('user', item.owner);
                    }}>{item.owner}</span>
                  </div>
                </div>
              </article>
            );
          })
          : <div className='noData'>검색된 데이터가 없습니다.</div>
          }
        </div>
      </div>

      <Popup ref={pop}>
        {Pics &&
          <img src={`https://live.staticflickr.com/${Pics[Index].server}/${Pics[Index].id}_${Pics[Index].secret}_b.jpg`} alt={Pics[Index].title} />
        }
      </Popup>
    </section>
  );
}