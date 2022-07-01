import React,{Component} from "react";


class MenuSwitch extends Component{

  constructor(props){
    super(props);
    this.state={
      IsNum:0,
      SetOnValueLast:null,
    };
  }

  static getDerivedStateFromProps(nextProps,prevState){
    // 可以监听props和state的变化
    // console.log("=============导航栏这里！！！==============")
    // console.log(nextProps);
    // console.log(prevState);
    if(prevState.SetOnValueLast!==nextProps.SetOnValue){
      prevState.IsNum=nextProps.SetOnValue*1;
    }
    return {SetOnValueLast:nextProps.SetOnValue};
  }

  ChooseOn(num){
    this.setState({IsNum:num});
  }
  HandClick(value){
    this.props.click(value);
    this.ChooseOn(value);
  }

  render(){
    return(
      <section className="men_css">
        <div className="men_all">
          {
            this.props.Data.map((number)=>
            <div key={number.num} className={`MenName select_title_css ${((this.state.IsNum*1===number.num*1)?'active':'')}`}
              onClick={()=>this.HandClick(number.num)}
            >
              {number.name}
            </div>
          )}
        </div>
      </section>
    );
  }
}
export default MenuSwitch;