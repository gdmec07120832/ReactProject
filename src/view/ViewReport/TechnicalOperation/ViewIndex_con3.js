import React, {Component} from "react";
import Indextcq from "../components/Indextcq";
import Tabletcq from "../components/tabletcq";
import {ChartData} from "../components/Handle";

import * as charts from 'echarts';
import ReactEcharts from "echarts-for-react";
import fetchSql from "../../utils/fetchSql"
import { Empty } from 'antd';
class ViewIndex_con3 extends Component {

  constructor(props) {
    super(props);
    this.state={
      SetOption:ChartData(),
      ChartIsNull:false,
      ChartIsNullTab:false,
      tableData:{
        index:'Accident',
        labelD:[],
        tableD:[],
      },
      OnIndex:[
        {OnType:'Accident',sign:0,OnWith:50, IndexData:[
          {title:'事故总数',Tnum:0,ContInfo:[]},
          {title:'P1事故数',Tnum:0,ContInfo:[]},
          {title:'P2事故数',Tnum:0,ContInfo:[]},
          {title:'P3事故数',Tnum:0,ContInfo:[]},
          {title:'P4事故数',Tnum:0,ContInfo:[]},
        ]},
      ]
    };
  }
  componentDidMount(){
    this.GetViewData();
    this.GetChartsOn();
    this.GetTableWholeFun();
  }

  async GetViewData(){

    let res = await fetchSql('NON_PM_FAULT','FAULT_TOTAL',{});
    let UserData=res.data;
    let SetData=[];
    if(UserData.length>0){
      SetData=[
        {OnType:'Accident',sign:0,OnWith:100, IndexData:[
          {title:'事故总数',Tnum:UserData[0].FAULT_CNT,ContInfo:[]},
          {title:'P1事故数',Tnum:UserData[0].P1_CNT,ContInfo:[]},
          {title:'P2事故数',Tnum:UserData[0].P2_CNT,ContInfo:[]},
          {title:'P3事故数',Tnum:UserData[0].P3_CNT,ContInfo:[]},
          {title:'P4事故数',Tnum:UserData[0].P4_CNT,ContInfo:[]},
        ]},
      ];
    }else{
      SetData=[
        {OnType:'Accident',sign:0,OnWith:50, IndexData:[
          {title:'事故总数',Tnum:0,ContInfo:[]},
          {title:'P1事故数',Tnum:0,ContInfo:[]},
          {title:'P2事故数',Tnum:0,ContInfo:[]},
          {title:'P3事故数',Tnum:0,ContInfo:[]},
          {title:'P4事故数',Tnum:0,ContInfo:[]},
        ]},
      ];
    }
    this.setState({OnIndex:SetData});

  }

  async GetChartsOn(){

    let ChartOnData=ChartData();    
    let OnData = await fetchSql('NON_PM_FAULT','FAULT_DEPT',{});
    let UserData=OnData.data;

    ChartOnData.xAxis[0].data=[];
    ChartOnData.series[0].data=[];
    ChartOnData.series[1].data=[];
    ChartOnData.series[2].data=[];
    ChartOnData.series[3].data=[];
    ChartOnData.grid.top=35;
    ChartOnData.grid.left=20;
    ChartOnData.grid.right=20;
    ChartOnData.series[0].type='bar';
    ChartOnData.series[1].type='bar';
    ChartOnData.series[2].type='bar';
    ChartOnData.series[3].type='bar';
    ChartOnData.series[0].barWidth='15%';
    ChartOnData.series[1].barWidth='15%';
    ChartOnData.series[2].barWidth='15%';
    ChartOnData.series[3].barWidth='15%';
    ChartOnData.series[0].itemStyle.normal.color='#5B8FF9';
    ChartOnData.series[1].itemStyle.normal.color='#73DEB3';
    ChartOnData.series[2].itemStyle.normal.color='#5D7092';
    ChartOnData.series[3].itemStyle.normal.color='#F7C739';
    ChartOnData.legend.itemWidth=8;
    ChartOnData.legend.x='center';
    ChartOnData.series[0].name='P1事故数';
    ChartOnData.series[1].name='P2事故数';
    ChartOnData.series[2].name='P3事故数';
    ChartOnData.series[3].name='P4事故数';

    if(UserData.length>0){
      this.ChartIsNull=false;
      Object.keys(UserData).forEach((OnKey) => {
        ChartOnData.xAxis[0].data.push(UserData[OnKey].DEPT_NAME); 
        ChartOnData.series[0].data.push(UserData[OnKey].P1_CNT);
        ChartOnData.series[1].data.push(UserData[OnKey].P2_CNT);
        ChartOnData.series[2].data.push(UserData[OnKey].P3_CNT);
        ChartOnData.series[3].data.push(UserData[OnKey].P4_CNT);
      });
    }else{
      this.ChartIsNull=true;
    }

    this.setState({SetOption:ChartOnData});
  }

  async GetTableWholeFun(){

    
    let res = await fetchSql('NON_PM_FAULT','FAULT_DEPT',{});
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
      {Val:'事故总数',Width:15.32},
      {Val:'P1事故数',Width:15.66},
      {Val:'P2事故数',Width:15.66},
      {Val:'P3事故数',Width:16.66},
      {Val:'P4事故数',Width:16.66}
    ];
    UserData.tableD=[];

    if(SetData.length>0){
      this.setState({ChartIsNullTab:false});
      Object.keys(SetData).forEach((OnKey) => {
        UserData.tableD.push(
          [
            {Val:SetData[OnKey].DEPT_NAME,Width:22},
            {Val:SetData[OnKey].FAULT_CNT,Width:15.32},
            {Val:SetData[OnKey].P1_CNT,Width:15.66},
            {Val:SetData[OnKey].P2_CNT,Width:15.66},
            {Val:SetData[OnKey].P3_CNT,Width:16.66},
            {Val:SetData[OnKey].P4_CNT,Width:16.66},
          ]
        )
      });
    }else{
      this.setState({ChartIsNullTab:true});
    }

    this.setState({tableData:UserData});
    this.props.SentH(this.Con3.clientHeight);
  }


  render(){
    return(
      <div className="table-box" ref={Con3=>(this.Con3=Con3)}>
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
                <Empty description={'本周无事故'} style={{height: '250px'}} />
            }
          </div>

        </div>
      </div>
    )
  }
}

export default ViewIndex_con3;