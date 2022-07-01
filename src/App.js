// import logo from './logo.svg';
import './App.css';
import './Css.scss';
import {HashRouter as Router,Link} from 'react-router-dom'  //路由配置

import RoutesOn from './view/routes/index'
import {useDispatch} from 'react-redux';  //函数组件需要加上 useDispatch 这个才能修改store的值






function App() {
  const dispatch = useDispatch()
  dispatch({
    type: 'update_routes',
    routesNameMapV2:'QQQQQQQQQQQQQ',
    routes:'AAAAAAAAA'
  });  
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
