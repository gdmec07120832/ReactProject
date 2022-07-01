
import React,{Component} from "react";
import {Swiper,SwiperSlide } from 'swiper/react';//引入js
import {Controller} from 'swiper'
import 'swiper/swiper.min.css'

class Layout extends Component{

  constructor(props){
    super(props);
    this.state={
      UserSwiper:null,
    };
    this.SetOnSwip=this.SetOnSwip.bind(this);
  }

  // testFum(swiper){
  //   console.log("========1111===========");
  //   console.log(swiper);
  // }

  componentDidMount(){
    console.log(this.state.UserSwiper);
  }

  SetOnSwip(swiper){
    this.setState({UserSwiper:swiper});
  }


  render(){

    return (
      // <div>
      //   <p>这是主要</p>
      // </div>  onSwiper={(swiper)=> this.state.UserSwiper=swiper }
      <div>
        <Swiper style={{width:'400px'}} onSlideChange={(swiper)=>{return swiper.activeIndex=1}}
          onSwiper={(swiper)=>this.SetOnSwip(swiper)}
          initialSlide={1}
          controller={{ control: 1 }}
          modules={[Controller]}
        >
          <SwiperSlide>11</SwiperSlide>
          <SwiperSlide>22</SwiperSlide>
          <SwiperSlide>33</SwiperSlide>
        </Swiper>  

        <button onClick={() => console.log(this.state.UserSwiper.slideTo(2,0))} className="prepend-slide">
          Slide 1
        </button>      
      </div>  
   
      
      
    );
  }
}

export default Layout;