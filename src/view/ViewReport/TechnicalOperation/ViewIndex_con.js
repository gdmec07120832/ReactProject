import React,{Component} from "react";
// useState
// import '../TechnicalOperation/ViewCss.scss'
import Indextcq from "../components/Indextcq"
import Tabletcq from "../components/tabletcq"
import {ChartData} from "../components/Handle"

import * as charts from 'echarts';
import ReactEcharts from "echarts-for-react";
import fetchSql from "../../utils/fetchSql"
import { Radio } from 'antd';


class ViewIndex_con extends Component{


  // OnIndex=[
  //   {OnType:'Demand',sign:0,OnWith:100, IndexData:[
  //     {title:'需求数量',Tnum:0,ContInfo:[]},
  //     {title:'开发任务',Tnum:0,ContInfo:[]},
  //     {title:'测试缺陷',Tnum:0,ContInfo:[{title:'占比',val:0.56}]},
  //     {title:'线上缺陷',Tnum:0,ContInfo:[{title:'占比',val:0.68}]},
  //     {title:'部门人数',Tnum:0,ContInfo:[{title:'占比',val:0.88}]},
  //   ]},
  // ];
  TableData=[];

  constructor(props){
    super(props);
    this.state={
      SetOption:ChartData(),
      CheValue:1,
      tableData:{
        index:'Demand',
        labelD:[],
        tableD:[],
      },
      OnIndex:[
        {OnType:'Demand',sign:0,OnWith:100, IndexData:[
          {title:'需求数量',Tnum:0,ContInfo:[]},
          {title:'开发任务',Tnum:0,ContInfo:[]},
          {title:'测试缺陷',Tnum:0,ContInfo:[]},
          {title:'线上缺陷',Tnum:0,ContInfo:[]},
          {title:'部门人数',Tnum:0,ContInfo:[]},
        ]},
      ]
    };
    this.onChange = this.onChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps,prevState){
    // 可以监听props和state的变化
    // console.log(nextProps);
    // console.log("===========================")
    // console.log(prevState);
    return null;
  }

  componentDidMount(){
    this.GetViewIndex();
    this.GetChartsOn();
    this.GetTableWholeFun();
  }

  onChange(OnValue){
    this.setState({CheValue:OnValue.target.value});
    this.TableWholeFunOn(this.TableData,OnValue.target.value);
  }

  async GetViewIndex(){

    let res = await fetchSql('NON_PM_ZT','ZT_STORY',{});
    let UserData=res.data;
    let SetOnIndex=[];
    if(UserData.length>0){
      SetOnIndex=[
        {OnType:'Demand',sign:0, IndexData:[
          {title:'需求数量',Tnum:UserData[0].STORY_CNT,ContInfo:[]},
          {title:'开发任务',Tnum:UserData[0].TASK_CNT,ContInfo:[]},
          {title:'测试缺陷',Tnum:UserData[0].BUG_CNT,ContInfo:[]},
          {title:'线上缺陷',Tnum:UserData[0].ONLINE_BUG_CNT,ContInfo:[]},
          {title:'部门人数',Tnum:UserData[0].STAFF_CNT,ContInfo:[]},
        ]},
      ];
    }else{
      SetOnIndex=[
        {OnType:'Demand',sign:0, IndexData:[
          {title:'需求数量',Tnum:0,ContInfo:[]},
          {title:'开发任务',Tnum:0,ContInfo:[]},
          {title:'测试缺陷',Tnum:0,ContInfo:[]},
          {title:'线上缺陷',Tnum:0,ContInfo:[]},
          {title:'部门人数',Tnum:0,ContInfo:[]},
        ]},
      ];
    }

    this.setState({OnIndex:SetOnIndex});

  }

  async GetChartsOn(){
    console.log("==========运行到这里！！============");

    let ChartOnData=ChartData();    
    let OnData = await fetchSql('NON_PM_ZT','ZT_STORY_DEPT',{});
    OnData.data.sort((a,b)=>{return (a['RANK_ON']) - (b['RANK_ON'])});
    let UserData=OnData.data;
    // console.log(UserData);

    ChartOnData.xAxis[0].data=[];
    ChartOnData.series[0].data=[];
    ChartOnData.series[1].data=[];
    ChartOnData.series[2].data=[];
    ChartOnData.series[3].data=[];
    ChartOnData.series[4].data=[];
    ChartOnData.grid.top=35;
    ChartOnData.grid.left=20;
    ChartOnData.grid.right=20;
    ChartOnData.grid.bottom=10;
    ChartOnData.series[0].type='bar';
    ChartOnData.series[1].type='bar';
    ChartOnData.series[2].type='bar';
    ChartOnData.series[3].type='bar';
    ChartOnData.series[4].type='line';
    ChartOnData.series[0].barWidth='15%';
    ChartOnData.series[1].barWidth='15%';
    ChartOnData.series[2].barWidth='15%';
    ChartOnData.series[3].barWidth='15%';
    ChartOnData.series[4].barWidth='15%';
    ChartOnData.series[0].itemStyle.normal.color='#5B8FF9';
    ChartOnData.series[1].itemStyle.normal.color='#73DEB3';
    ChartOnData.series[2].itemStyle.normal.color='#7585A2';
    ChartOnData.series[3].itemStyle.normal.color='#F7C739';
    ChartOnData.series[4].itemStyle.normal.color='#DFE4EA';
    ChartOnData.series[4].smooth=false;
    ChartOnData.legend.itemWidth=8;
    ChartOnData.legend.x='center';
    ChartOnData.series[0].name='需求数量';
    ChartOnData.series[1].name='开发任务';
    ChartOnData.series[2].name='测试缺陷';
    ChartOnData.series[3].name='线上缺陷';
    ChartOnData.series[4].name='部门人数';

    Object.keys(UserData).forEach((OnKey) => {
      ChartOnData.xAxis[0].data.push(UserData[OnKey].DEPT_NAME);
      ChartOnData.series[0].data.push(UserData[OnKey].STORY_CNT);
      ChartOnData.series[1].data.push(UserData[OnKey].TASK_CNT);
      ChartOnData.series[2].data.push(UserData[OnKey].BUG_CNT);
      ChartOnData.series[3].data.push(UserData[OnKey].ONLINE_BUG_CNT);
      ChartOnData.series[4].data.push(UserData[OnKey].STAFF_CNT);
    });    

    // this.setState({SetOption:ChartOnData});
    this.setState(this.state.SetOption=ChartOnData);

  }
  
  async GetTableWholeFun(){

    let res = await fetchSql('NON_PM_ZT','ZT_STORY_DEPT',{});
    res.data.sort((a,b)=>{
      return (a['RANK_ON']) - (b['RANK_ON'])
    });
    this.TableData=res.data;
    this.TableWholeFunOn(res.data,1);
  }

  TableWholeFunOn(SetData,SetOnVal){

    let UserData={
      index:'Demand',
      labelD:[],
      tableD:[],
    };
    UserData.labelD=[
      {Val:'部门',Width:23},
      {Val:'需求',Width:10.32},
      {Val:'开发任务',Width:16.66},
      {Val:'测试缺陷',Width:16.66},
      {Val:'线上缺陷',Width:16.66},
      {Val:'部门人数',Width:16.66}
    ];
    UserData.tableD=[];

    let OnData=SetData

    if(OnData.length>0){
      if(SetOnVal===1){
        Object.keys(OnData).forEach((OnKey) => {
          UserData.tableD.push(
            [
              {Val:OnData[OnKey].DEPT_NAME,Width:23},
              {Val:OnData[OnKey].STORY_CNT,Width:10.32},
              {Val:OnData[OnKey].TASK_CNT,Width:16.66},
              {Val:OnData[OnKey].BUG_CNT,Width:16.66},
              {Val:OnData[OnKey].ONLINE_BUG_CNT,Width:16.66},
              {Val:OnData[OnKey].STAFF_CNT,Width:16.66},
            ]
          )
        });   
      }else if(SetOnVal===2){
        Object.keys(OnData).forEach((OnKey) => {
          UserData.tableD.push(
            [
              {Val:OnData[OnKey].DEPT_NAME,Width:23},
              {Val:OnData[OnKey].STORY_CNT_RATE+'%',Width:10.32},
              {Val:OnData[OnKey].TASK_CNT_RATE+'%',Width:16.66},
              {Val:OnData[OnKey].BUG_CNT_REATE+'%',Width:16.66},
              {Val:OnData[OnKey].ONLINE_BUG_RATE+'%',Width:16.66},
              {Val:OnData[OnKey].STAFF_CNT,Width:16.66},
            ]
          )
        });   
      }

    }
    this.setState({tableData:UserData});
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
              <ReactEcharts echarts={charts} 
                option={this.state.SetOption}
                style={{ height: '250px', width: '100%' }}
              />              
            </div>

            <div className="TableCss">
              <div className="SingChoice">
                <Radio.Group onChange={this.onChange} value={this.state.CheValue}>
                  <Radio value={1}>数量</Radio>
                  <Radio value={2}>占比</Radio>
                </Radio.Group>
              </div>
              <Tabletcq TabData={this.state.tableData} />
            </div>

          </div>
        </div>

    );
  }

}

export default ViewIndex_con;