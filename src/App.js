import './asset/scss/style.scss';
import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as types from './redux/actionType';

// common
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// main
import Main from './components/main/Main';

// sub
import About from './components/sub/About';
import Book from './components/sub/Book';
import Content from './components/sub/Content';
import Photo from './components/sub/Photo';
import Review from './components/sub/Review';
import Store from './components/sub/Store';
import Video from './components/sub/Video';
import Login from './components/sub/Login';
import Search from './components/sub/Search';

function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch({
      type: types.VISUAL.start
    });
    dispatch({
      type: types.FLICKR.start,
      Option: {type: 'interest', size: 5}
    });
    dispatch({
      type: types.YOUTUBE.start,
      Option: {query: '재즈', size: 4}
    });
    dispatch({
      type: types.BOOKS.start,
      Option: {query: '책', size: 8}
    });
    dispatch({
      type: types.ABOUT.start
    });
    dispatch({
      type: types.STORES.start
    });
  }, [dispatch]);

	return (
		<>
			<Switch>
				<Route exact path='/' component={Main}></Route>
				<Route path='/' render={()=><Header type='sub'/>}></Route>
			</Switch>

			<Route path='/book' component={Book}></Route>
			<Route path='/content/:bookId' component={Content}></Route>
			<Route path='/review' component={Review}></Route>
			<Route path='/photo' component={Photo}></Route>
			<Route path='/video' component={Video}></Route>
			<Route path='/about' component={About}></Route>
			<Route path='/store' component={Store}></Route>
			<Route path='/login' component={Login}></Route>
			<Route path='/search' component={Search}></Route>

			<Footer></Footer>
		</>
	);
}

export default App;
