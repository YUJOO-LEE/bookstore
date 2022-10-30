import { useDispatch } from 'react-redux';
import * as types from './redux/actionType';

export default function Vids() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: types.YOUTUBE.start,
      Option: {query: '재즈', size: 4}
    });
  }, [])

  return (
    <section className='myScroll'>
      <div className='inner'>
        <h1>Vids</h1>
      </div>
    </section>
  );
}