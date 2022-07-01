import React,{Component} from "react";
import '../TechnicalOperation/ViewCss.scss'
import MenuSwitch from "../components/MenuSwitch"
import ViewIndexCon from "../TechnicalOperation/ViewIndex_con"
import ViewIndexCon2 from "./ViewIndex_con2";
import ViewIndexCon3 from "./ViewIndex_con3";

import { connect } from 'react-redux'

import {Swiper,SwiperSlide } from 'swiper/react';//引入js
// import {  Navigation,Thumbs,Autoplay } from "swiper";
// import SwiperCore,{Autoplay} from 'swiper/core';
// SwiperCore.use([Autoplay])

import 'swiper/swiper.min.css'

// const dispatch = useDispatch()

class ViewIndex extends Component{

  SentData=[
    { code: "Demand", name: "需求", num: 0 },
    { code: "Release", name: "发布", num: 1 },
    { code: "Accident", name: "事故", num: 2 },
  ];

  constructor(props){
    super(props);
    this.state={
      UerValue:'0',
      SetValue:'0',
      UserSwiper:null,
      Con1Heig:null,
      Con2Heig:null,
      Con3Heig:null,
    };
    this.OnClick = this.OnClick.bind(this);
    this.SliCHange = this.SliCHange.bind(this);
    this.SetOnSwip = this.SetOnSwip.bind(this);
  }

  
  

  static getDerivedStateFromProps(nextProps,prevState){
    // 可以监听props和state的变化
    // console.log(nextProps);
    // console.log("===========================")
    // console.log(prevState);
    return null;
  }

  componentDidMount(){
    // 类组件直接 this.props.dispatch 使用
    // this.props.dispatch({
    //   type: 'update_routes',
    //   routesNameMapV2:'QQQQQQQQQQQQQ',
    //   routes:'AAAAAAAAA'
    // });  
    // console.log("=======aaa===================");
    // console.log(this.props.routesNameMapV2);
    // console.log(this.props.routes);
  }

  SetOnSwip(swiper){
    this.setState({UserSwiper:swiper});
  }

  
  OnClick(value){
    console.log(value+'      '+'子组件的值！！！');
    this.setState({UerValue:value+''});
    this.state.UserSwiper.slideTo(value,500,false);
  }

  SliCHange(swiper){
    // console.log(swiper.activeIndex);
    this.setState({SetValue:swiper.activeIndex+''});
    this.setState({UerValue:swiper.activeIndex+''});
  }


  render(){

    return(
      <div className="ViewIndexAll">
        <div className='ViewIndexCss'>
          <MenuSwitch title='这是父组件的标题' SetOnValue={this.state.SetValue} Data={this.SentData} click={this.OnClick} />
        </div>

        {/* {
          (this.state.UerValue==='0')?<ViewIndexCon />:
          (this.state.UerValue==='1')?<ViewIndexCon2 />:<ViewIndexCon3 />onSwiper={(swiper)=>console.log(swiper)}
        } */}

        <Swiper style={{width:'100%',height:((this.state.UerValue==='0')?this.state.Con1Heig:
          (this.state.UerValue==='1')?this.state.Con2Heig:this.state.Con3Heig)+'px',overflow: 'hidden'}} 
          onSlideChange={this.SliCHange} 
          onSwiper={(swiper)=>this.SetOnSwip(swiper)}
          initialSlide={this.state.UerValue}
        >
          <SwiperSlide><ViewIndexCon SentH={(HeightOn)=>{this.setState({Con1Heig:HeightOn})}} /></SwiperSlide>
          <SwiperSlide><ViewIndexCon2 SentH={(HeightOn)=>{this.setState({Con2Heig:HeightOn})}} /></SwiperSlide>
          <SwiperSlide><ViewIndexCon3 SentH={(HeightOn)=>{this.setState({Con3Heig:HeightOn})}} /></SwiperSlide>
        </Swiper>


      </div>


    );
  }

}

export default connect((state)=>{
  return {
    routesNameMapV2: state.routes.routesNameMapV2,
    routes: state.routes.routes,
  }
})(ViewIndex);