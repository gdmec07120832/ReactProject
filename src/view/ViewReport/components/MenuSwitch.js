import React,{Component} from "react";


class MenuSwitch extends Component{

  constructor(props){
    super(props);
    this.state={IsNum:0};
  }
  ChooseOn(num){
    // console.log("================");
    // console.log(num);
    // this.state.IsNum=num;
    // console.log(this.state.IsNum);
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
            <div key={number.num} className={`MenName select_title_css ${((this.state.IsNum==number.num)?'active':'')}`}
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