import './scss/style.scss';
import { Route, Switch } from 'react-router-dom';

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

function App() {
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

			<Footer></Footer>
		</>
	);
}

export default App;
