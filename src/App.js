import Sidebar from './sidebar';
import './App.css';
import Main from './home';
import Header from './header';
import Footer from './footer';
function App() {
  return(
  <>
  <Header />
  <div className='body'>
  <Sidebar/>
  <Main/>
  </div>
  <Footer/>
  </>)
}

export default App;
