import React,{Component} from "react";


class Indextcq extends Component{
  constructor(props){
    super(props);
    this.state={IsNum:0};
    console.log("===aaa===");
  }

  componentDidMount(){
    // console.log(this.props.Data[0].IndexData);
  }

  render(){
    return(
      <div className="IndexCss">
        {this.props.IndexData[0].IndexData.map((item,index)=>
          <div className="IndexLabel" key={index}>
            <div className="IndexName">{item.title}</div>
            <div className="IndexVal">{item.Tnum}</div>
            {
              item.ContInfo.length>0 &&
              <div className="IsContInfo">
                {item.ContInfo.map((item1,index1)=>
                  <div className="ContInfo" key={index1} style={{width:this.props.IndexData[0].OnWith+'%'}}>
                    <div className="ConTitle" >{item1.title}</div>
                    <div className="ConVal">{item1.val}</div>   
                  </div>                       
                )}
              </div>
            }
          </div>
        )}
      </div>
    );
  }

}


export default Indextcq;
