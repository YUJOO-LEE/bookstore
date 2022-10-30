import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as types from './redux/actionType';

export default function Pics() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: types.FLICKR.start,
      Option: {type: 'interest', size: 4}
    });
  }, [])

  return (
    <section className='myScroll'>
      <div className='inner'>
        <h1>Pics</h1>
      </div>
    </section>
  );
}