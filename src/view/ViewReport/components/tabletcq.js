import React,{Component} from "react";

class tabletcq extends Component{

  constructor(props){
    super(props);
    this.state={};
  }
  componentDidMount(){
    console.log(this.props.TabData)
  }

  HandVal(Cval, Rval, val){
    if(Cval!==undefined&&Rval!==undefined&&val!==undefined) return val
  }
  HandleColor(Cval, Rval, val) {
    if(Cval!==undefined&&Rval!==undefined&&val!==undefined) return ''
  }

  render(){
    return(
      <div className="TableWhole">
        <div className="TableHeard">
          <table>
            <thead>
              <tr>
                {this.props.TabData.labelD.map((item,index)=>
                  <td key={index} title={item.Val} style={{width:item.Width+'%'}}> 
                    {item.Val}
                  </td>      
                )}
              </tr>
            </thead>
          </table>
        </div>

        <div className="TableBody">
          <table>
            <tbody>
              {this.props.TabData.tableD.map((item,index)=>
                <tr key={index}>
                  {item.map((item1,index1)=>
                    <td key={index1} title={item1.Val} 
                      style={{width:item1.Width+'%'}} className={this.HandleColor(index,index1,item1.Val)}>
                      {this.HandVal(index,index1,item1.Val)}
                    </td>                  
                  )}
                </tr>                
              )}
            </tbody>
          </table>
        </div>
      </div>
    ); 
  }

}
export default tabletcq;
