import React,{Component} from "react";
// import {HashRouter as Router,Routes,Route,Link,Navigate} from 'react-router-dom'  //路由配置
import {Routes,Route,Navigate} from 'react-router-dom'  //路由配置
import Loadable from '@loadable/component'

class routes extends Component{

  routers=[
    {
      name:'Layout',
      path:'/',
      exact:true,
      component:Loadable(()=> import('../components/Layout'))
    },

    {
      name:'LayoutTest',
      path:'/LayoutTest',
      exact:false,
      component:Loadable(()=> import('../components/Layout_test'))
    },

    {
      name:'ViewIndex',
      path:'/ViewIndex',
      exact:false,
      component:Loadable(()=> import('../ViewReport/TechnicalOperation/ViewIndex'))
    },
    {
      name:'Test',
      path:'/about',
      exact:false,
      component:Loadable(()=> import('../test'))
    },

    {
      name:'404',
      path:'/404',
      exact:false,
      component:Loadable(()=> import('../components/404'))
    },
  ];

  render () {
    return(
      <Routes>
        {/* <Route path="/" exact element={<Layout />}  />
        <Route path="/about" exact element={<Test value={1} />}  />      */}
        {this.routers.map((item,index)=>{
          return(
            <Route 
              key={index}  
              path={item.path}
              exact={item.exact}
              element={<item.component />}
            />
          );
        })}    
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    )
  }
}
export default routes;