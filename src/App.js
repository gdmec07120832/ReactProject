import logo from './logo.svg';
import './App.css';
import './Css.scss';
import {HashRouter as Router,Link} from 'react-router-dom'  //路由配置

import RoutesOn from './view/routes/index'

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Link to='/'>Home</Link>
          <Link to='/about'>About</Link>
          <Link to='/ViewIndex'>测试页面</Link>
        </div>
        <RoutesOn />
      </Router>
    </div>
  );
}

export default App;
