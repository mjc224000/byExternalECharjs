
window.byExternalEChartjs_byEChartjs = (function () {
    const colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];

    function stringToColor(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        const ret = colors[Math.abs(hash) % colors.length];

        return ret;
    }

    function getGradientColors(name) {
        const mainColor = stringToColor(name);
        const gradientColor = stringToColor('gradient' + name);
        console.log(name, mainColor, gradientColor)
        return {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                    offset: 0,
                    color: mainColor
                },
                {
                    offset: 1,
                    color: gradientColor
                }
            ])
        };
    }
    return class{

        /**
 * 创建一个区域堆栈渐变。
 *
 * @param {string} id - 应用渐变的元素的ID。
 * @param {string} title - 图表的标题。
 * @param {Array<string>} names - 系列的名称。
 * @param {Array<Array<number>>} data - 系列的数据。
 * @param {Array<string>} xAxis - x轴的标签。
 */
    static areaStackGradient(id, title, names, data, xAxis) {
            var chartDom = document.getElementById(id);
            var myChart = echarts.init(chartDom);
            var option = {
              color: names.map(stringToColor),
              title: {
                text: title
              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'cross',
                  label: {
                    backgroundColor: '#6a7985'
                  }
                }
              },
              legend: {
                data:names
              },
              toolbox: {
                feature: {
                  saveAsImage: {}
                }
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: [
                {
                  type: 'category',
                  boundaryGap: false,
                  data: xAxis
                }
              ],
              yAxis: [
                {
                  type: 'value'
                }
              ],
              series: names.map((item,i) => {
                const colors = getGradientColors(item);
                return {
                  name: item,
                  type: 'line',
                  stack: 'Total',
                  smooth: true,
                  lineStyle: {
                    width: 0
                  },
                  showSymbol: false,
                  areaStyle: {
                    opacity: 0.8,
                    color: colors.color
                  },
                  emphasis: {
                    focus: 'series'
                  },
                  data: data[i]
                };
              })
            };
            
            option && myChart.setOption(option);
    
        }
           
    }
})()