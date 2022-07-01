
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
      ChartIsNullTab:false,
      tableData:{
        index:'Release',
        labelD:[],
        tableD:[],
      },
      OnIndex:[
        {OnType:'Release',sign:0, IndexData:[
          {title:'发布总数',Tnum:0,ContInfo:[]},
          {title:'常规发布',Tnum:0,ContInfo:[]},
          {title:'紧急发布',Tnum:0,ContInfo:[]},
        ]},
      ]
    }
  }

  componentDidMount(){
    this.GetViewData();
    this.GetChartsOn();
    this.GetTableWholeFun();

  }



  async GetViewData(){

    let res = await fetchSql('NON_PM_PUSH','PUSH_TOTAL',{});
    let UserData=res.data;
    let SetData=[];

    if(UserData.length>0){
      SetData=[
        {OnType:'Release',sign:0,OnWith:100, IndexData:[
          {title:'发布总数',Tnum:UserData[0].PUBLISH_CNT,ContInfo:[]},
          {title:'常规发布',Tnum:UserData[0].ROUTINE_CNT,ContInfo:[
            {title:'占比',val:UserData[0].ROUTINE_CNT_RATE}
          ]},
          {title:'紧急发布',Tnum:UserData[0].URGENT_CNT,ContInfo:[
            {title:'占比',val:UserData[0].URGENT_CNT_RATE}
          ]},
        ]},
      ];
    }else{
      SetData=[
        {OnType:'Release',sign:0, IndexData:[
          {title:'发布总数',Tnum:0,ContInfo:[]},
          {title:'常规发布',Tnum:0,ContInfo:[]},
          {title:'紧急发布',Tnum:0,ContInfo:[]},
        ]},
      ];
    }
    this.setState({OnIndex:SetData});

  }

  async GetChartsOn(){

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


  async GetTableWholeFun(){

    let res = await fetchSql('NON_PM_PUSH','PUSH_DEPT',{});
    this.TableData=res.data;

    this.TableWholeFunOn(res.data);
  }

  TableWholeFunOn(SetData){
    let UserData={
      index:'Demand',
      labelD:[],
      tableD:[],
    };
    UserData.labelD=[
      {Val:'部门',Width:22},
      {Val:'发布总数',Width:16.66},
      {Val:'常规发布',Width:16.66},
      {Val:'占比',Width:13.32},
      {Val:'紧急发布',Width:16.66},
      {Val:'占比',Width:14.66}
    ];
    UserData.tableD=[];

    if(SetData.length>0){
      this.setState({ChartIsNullTab:false});
      Object.keys(SetData).forEach((OnKey) => {
        UserData.tableD.push(
          [
            {Val:SetData[OnKey].TWO_DEPT,Width:22},
            {Val:SetData[OnKey].PUBLISH_CNT,Width:16.66},
            {Val:SetData[OnKey].ROUTINE_CNT,Width:16.66},
            {Val:SetData[OnKey].ROUTINE_CNT_RATE.toFixed(1)+'%',Width:13.32},
            {Val:SetData[OnKey].URGENT_CNT,Width:16.66},
            {Val:SetData[OnKey].URGENT_CNT_RATE.toFixed(1)+'%',Width:14.66},
          ]
        )
      });
    }else{
      this.setState({ChartIsNullTab:true});
    }

    this.setState({tableData:UserData});
    this.props.SentH(this.Con2.clientHeight);

  }




  render(){
    return(
      <div className="table-box" ref={Con2=>(this.Con2=Con2)}>
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

          <div className="TableCss" style={{padding: '20px 0 0 0'}}>
            {
              (this.state.ChartIsNullTab===false)?
                <Tabletcq TabData={this.state.tableData} />:
                <Empty description={'本周无发布'} style={{height: '250px'}} />
            }
          </div>


        </div>
      </div>
    )
  }  
}

export default ViewIndex_con2;