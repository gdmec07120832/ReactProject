
import React,{Component} from "react";
import Indextcq from "../components/Indextcq"
import Tabletcq from "../components/tabletcq"
import {ChartData} from "../components/Handle"

import * as charts from 'echarts';
import ReactEcharts from "echarts-for-react";
import fetchSql from "../../utils/fetchSql"
import { Empty } from 'antd';

class ViewIndex_con2 extends Component{

  constructor(props){
    super(props);
    this.state={
      SetOption:ChartData(),
      ChartIsNull:false,
      tableData:{
        index:'Release',
        labelD:[],
        tableD:[],
      },
      OnIndex:[
        {OnType:'Release',sign:0,OnWith:50, IndexData:[
          {title:'需求数量',Tnum:0,ContInfo:[]},
          {title:'开发任务',Tnum:0,ContInfo:[]},
          {title:'测试缺陷',Tnum:0,ContInfo:[]},
          {title:'线上缺陷',Tnum:0,ContInfo:[]},
          {title:'部门人数',Tnum:0,ContInfo:[]},
        ]},
      ]
    }
  }

  componentDidMount(){

    this.GetChartsOn();

  }

  async GetChartsOn(){
    console.log("==========fabu运行到这里！！============");

    let ChartOnData=ChartData();    
    // let OnData=this.UserData.SetData["NON_PM_PUSH-PUSH_DEPT"];
    let OnData = await fetchSql('NON_PM_PUSH','PUSH_DEPT',{});
    let UserData=OnData.data;

    ChartOnData.xAxis[0].data=[];
    ChartOnData.series[0].data=[];
    ChartOnData.series[1].data=[];
    ChartOnData.grid.top=35;
    ChartOnData.grid.left=20;
    ChartOnData.grid.right=20;
    ChartOnData.series[0].type='bar';
    ChartOnData.series[1].type='bar';
    ChartOnData.series[0].barWidth='15%';
    ChartOnData.series[1].barWidth='15%';
    ChartOnData.series[0].itemStyle.normal.color='#5B8FF9';
    ChartOnData.series[1].itemStyle.normal.color='#F7C739';
    ChartOnData.series[0].name='常规发布';
    ChartOnData.series[1].name='紧急发布';
    ChartOnData.legend.x='center';

    if(UserData.length>0){
      this.state.ChartIsNull=false;
      Object.keys(UserData).forEach((OnKey) => {
        ChartOnData.xAxis[0].data.push(UserData[OnKey].TWO_DEPT);
        ChartOnData.series[0].data.push(UserData[OnKey].ROUTINE_CNT);
        ChartOnData.series[1].data.push(UserData[OnKey].URGENT_CNT);
      });
    }else{
      this.state.ChartIsNull=true;
    }

    this.setState({SetOption:ChartOnData});


  }




  render(){
    return(
      <div className="table-box">
        <div className="TimeCss">
          <p>数据时间：2022-06-16 至 2022-06-22</p>
        </div>
        <div className="CountCss">
          <div className="CounTitle">
            <p>本周整体概况</p>
          </div>

          <div className="IndexOnCss">
            <Indextcq IndexData={this.state.OnIndex} />        
          </div>

          <div className="ChartCss" style={{width:'100%'}} id="ChartTrendTest">
            {
              (this.state.ChartIsNull===false)?
                <ReactEcharts echarts={charts} 
                  option={this.state.SetOption}
                  style={{ height: '250px', width: '100%' }}
                />:<Empty description={'本周无发布'} style={{height: '250px'}} />
            }
                   
          </div>


        </div>
      </div>
    )
  }  
}

export default ViewIndex_con2;