import React,{Component} from "react";
import '../TechnicalOperation/ViewCss.scss'
import MenuSwitch from "../components/MenuSwitch"
import ViewIndex_con from "../TechnicalOperation/ViewIndex_con"
import ViewIndex_con2 from "./ViewIndex_con2";


class ViewIndex extends Component{

  SentData=[
    { code: "Demand", name: "需求", num: 0 },
    { code: "Release", name: "发布", num: 1 },
    { code: "Accident", name: "事故", num: 2 },
  ];

  constructor(props){
    super(props);
    this.state={
      UerValue:'0'
    };
    this.OnClick = this.OnClick.bind(this);
  }
  

  static getDerivedStateFromProps(nextProps,prevState){
    // 可以监听props和state的变化
    // console.log(nextProps);
    // console.log("===========================")
    // console.log(prevState);
    return null;
  }

  componentDidMount(){

  }

  
  OnClick(value){
    // console.log(value+'      '+'子组件的值！！！');
    this.setState({UerValue:value+''});
  }


  render(){

    // const [initload,setInitload] = useState(true);

    return(
      <div className="ViewIndexAll">
        <div className='ViewIndexCss'>
          <MenuSwitch title='这是父组件的标题' Data={this.SentData} click={this.OnClick} />
        </div>

        {
          (this.state.UerValue==='0')?<ViewIndex_con />:
          (this.state.UerValue==='1')?<ViewIndex_con2 />:''
        }
      </div>


    );
  }

}

export default ViewIndex;