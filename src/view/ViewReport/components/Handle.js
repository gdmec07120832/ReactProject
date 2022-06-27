
export const HandleNum = (Type, val) => {
    if (val === null || val === undefined || (!val && val !== 0) || val == 'NaN' || val == '--' || val == 0) return '--'
    if (Type === 'percent') {
        return (val * 100).toFixed(2) + '%'
    } else if (Type === 'percent1') {
        return (val * 100).toFixed(1) + '%'
    } else if (Type === 'tenThousand') {
        return (val / 10000).toFixed(1).toLocaleString() + '万'
    } else if (Type === 'tenThousand2') {
        return (val / 10000).toFixed(0).toLocaleString() + '万'
    } else if (Type === 'HundredMillion') {
        return (val / 10000 / 10000).toFixed(2).toLocaleString() + '亿'
    } else if (Type === 'round') {
        return ((val * 1).toFixed(0) * 1).toLocaleString()
    } else if (Type === 'Null') {
        return val
    }

}

export const ChartData = () => {

    return {
        tooltip: {
          backgroundColor: '#fff',
          trigger: 'axis',
          extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);',
    
          axisPointer: {
            type: 'shadow',
          },
          
          textStyle: {
            color: '#333',
            fontSize: 12
          },
          formatter: null,
        },
        grid: {
          left: '0%',
          right: '0%',
          bottom: 0,
          top: 0,
          containLabel: true
        },
    
        legend: {
          show:true,
          icon: 'rect',
          itemWidth: 16,
          itemHeight: 2,
          textStyle:{
            color: '#8C8C8C',
            fontSize:10
          },
          selectedMode: false,
          top: '2%',
          right: '2%',
          x:null,
          y:null,
        },
    
        xAxis: [{
          type: 'category',
          // 月份
          data: [],
          axisTick: {
            show: false,
            alignWithLabel: true
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            formatter: null,
            interval:0,
            fontSize:10,
          }
        }],
        yAxis: [{
            type: 'value',
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
    
              formatter: null,
            },
            splitLine: {
              lineStyle: {
                color: '#F0F0F0',
                type: 'dashed'
              },
            },
            splitNumber: '3',
          },
    
        ],
        series: [{
            name: '',
            type: 'bar',
            barWidth: '20',
            data: [],
            itemStyle: {
              normal: {
                color: function (params) {
                  let color = ['#00a854', '#ff5953', '#5b8ff9']
                  // 2 目标 1 业绩
                  if (params.data[2] === null || params.data[2] === '--' || params.data[2] === undefined) return color[2]
                  let index = params.data[1] - params.data[2] >= 0 ? 1 : 0
                  return color[index]
                },
                barBorderRadius: [10, 10, 0, 0]
              }
            },
            label: {
              show: false,
              position: 'top',
              fontSize: 12,
              color: 'rgba(0, 0, 0, 0.88)',
            },
            z: 1,
            smooth: true,
          },
          {
            name: '',
            type: 'line',
            barWidth: '20',
            data: [],
            itemStyle: {
              normal: {
                color: '#e7e7e7',
                barBorderRadius: [10, 10, 0, 0]
              }
            },
            label: {
              show: false,
              position: 'top',
              fontSize: 12,
              color: 'rgba(0, 0, 0, 0.88)',
            },
            z: 1,
            // areaStyle: {
            //     color: '#f3f5f9',
            //     opacity: 1
            // },
            smooth: true,
            lineStyle: {
              color: '#e7e7e7'
            },
            symbol: 'none',
          },
    
          {
            name: '',
            type: 'line',
            barWidth: '20',
            data: [],
            itemStyle: {
              normal: {
                color: '#e7e7e7',
                barBorderRadius: [10, 10, 0, 0]
              }
            },
            label: {
              show: false,
              position: 'top',
              fontSize: 12,
              color: 'rgba(0, 0, 0, 0.88)',
            },
            z: 1,
            // areaStyle: {
            //     color: '#f3f5f9',
            //     opacity: 1
            // },
            smooth: true,
            lineStyle: {
              color: '#e7e7e7'
            },
            symbol: 'none',
          },
    
          {
            name: '',
            type: 'line',
            barWidth: '20',
            data: [],
            itemStyle: {
              normal: {
                color: '#e7e7e7',
                barBorderRadius: [10, 10, 0, 0]
              }
            },
            label: {
              show: false,
              position: 'top',
              fontSize: 12,
              color: 'rgba(0, 0, 0, 0.88)',
            },
            z: 1,
            // areaStyle: {
            //     color: '#f3f5f9',
            //     opacity: 1
            // },
            smooth: true,
            lineStyle: {
              color: '#e7e7e7'
            },
            symbol: 'none',
          },
    
          {
            name: '',
            type: 'line',
            barWidth: '20',
            data: [],
            itemStyle: {
              normal: {
                color: '#e7e7e7',
                barBorderRadius: [10, 10, 0, 0]
              }
            },
            label: {
              show: false,
              position: 'top',
              fontSize: 12,
              color: 'rgba(0, 0, 0, 0.88)',
            },
            z: 2,
            // areaStyle: {
            //     color: '#f3f5f9',
            //     opacity: 1
            // },
            smooth: true,
            lineStyle: {
              color: '#e7e7e7'
            },
            symbol: 'none',
          },
    
        ]
    }
    
}