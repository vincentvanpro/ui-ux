var chartDom = document.getElementById('chart');
var chartDom2 = document.getElementById('chart1');
var chartDom3 = document.getElementById('chart2');
var chartDom4 = document.getElementById('chart3');
var myChart = echarts.init(chartDom);
var myChart2 = echarts.init(chartDom2);
var myChart3 = echarts.init(chartDom3);
var myChart4 = echarts.init(chartDom4);


option = {
  tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} million ({d}%)'
  },
  color: ["#E15435", "#FEBC59", "#7495B4", "#94B47B", "#646861", "#3B3A3A"],
  legend: {
    orient: 'vertical',
    left: 'right',
    top: '35%'
  },
  series: [
    {
        data: [],
        emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    }
  ]
};

var option = JSON.parse(JSON.stringify(option))
fetch("data\\leading_streaming_platforms.json")
    .then(response => response.json())
    .then(json => {
        let data = json.data;
        let service_by_subscribers = [];

        data.forEach(item => {
            service_by_subscribers.push({value: Math.floor(item["subscribers"] / 1000000), name: item["streaming service"]});
        })

        option.title = {
            text: json.text,
            subtext: json.link,
            sublink: json.link,
            left: 'center'
        }


        option.series = [ {
            name: 'Streaming service',
            type: 'pie',
            radius: '50%',
            data: service_by_subscribers,
        } ]

        myChart.setOption(option);

    })


option1 = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    color: ["#65A0C0"],
    legend: {
        left: '78%',
        top: '15%'
    },
    xAxis: {
        data: [],
    },
    yAxis: {},

    series: [
        {
            name : "Name A",
            type : 'bar',
            data : []
        }
    ]
}


fetch("data\\world.json")
    .then(response => response.json())
    .then(json => {
        // Test for label calculation.
        json.features.forEach(feature => {
            feature.properties && (feature.properties.cp = null);
        });

        echarts.registerMap('world', json);

        var chart = echarts.init(document.getElementById('main'), null, {

        });

        var itemStyle = {
            normal:{
                borderWidth: 0.5,
                borderColor: 'black'
            },
            emphasis:{
                label:{show:true}
            }
        };

        fetch("data\\mapData.json")
            .then(response => response.json())
            .then(json => {
                let data = json.data;
                let pairs = []

                let streamingDict = {0: "Netflix", 1: "Amazon Prime", 2: "Diney+", 3: "Canal Plus", 4: "Globoplay", 5: "iQIYI", 6: "ivi TV", 7: "no info available"}
                data.forEach(item => {
                    pairs.push([item.name, item.value]);
                })
                var COLORS = [
                    "#070093",
                    "#1c3fbf",
                    "#1482e5",
                    "#70b4eb",
                    "#b4e0f3",
                    "#ffffff",
                ];
                chart.setOption({
                    title: {
                        text: 'Map of Top Streaming Services by Country',
                        subtext: json.link,
                        sublink: json.link,
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: function (params) {
                            return params.seriesName + '<br/>' + params.name + ': '+ streamingDict[data[params.dataIndex].value];
                        }
                    },
                    visualMap: [
                        {
                            show: false,
                            dimension: 0,
                            //categories: ["Netflix", "Amazon Prime", "Diney+", "Canal Plus", "Globoplay", "iQIYI", "ivi TV", "-"],
                            categories: [0, 1, 2, 3, 4, 5, 6, 7],
                            // the second visualMap component
                            type: 'piecewise', // defined as discrete visualMap
                            inRange: {
                                color: [
                                    '#ea0001',
                                    '#f59303',
                                    '#154aa0',
                                    '#572580',
                                    '#6feabb',
                                    '#00c133',
                                    '#f37595',
                                    'grey',
                                ]
                            },
                            outOfRange: {
                                color: 'grey'
                            },
                        }
                    ],
                    grid: {
                      containLabel: true
                    },
                    series: [
                        {
                            name: 'Top Streaming Service',
                            type: 'map',
                            map: 'world',
                            roam: true,
                            top: 60,
                            width: '80%',
                            label: {
                                show: true,
                                textBorderColor: '#fff',
                                textBorderWidth: 1
                            },
                            itemStyle: itemStyle,
                            data: data
                        }
                    ]
                })
            })
    })


var option1 = JSON.parse(JSON.stringify(option1))
fetch("data\\subscribers.json")
    .then(response => response.json())
    .then(json => {
        let data = json.data;
        let sub_data_by_years = []
        let years = []

        data.forEach(item => {
            sub_data_by_years.push(item.subscribersMil);
            years.push(item.QYear);
        })
        option1.title = {
            text: 'Annual Netflix Subscribers (Q2 of each respective year)',
            subtext: json.link,
            sublink: json.link,
            left: 'center'
        }

        option1.tooltip = {
            trigger: 'axis',
                axisPointer: {
                type: 'shadow'
            },
            formatter: function (params) {
                var tar = params[0];
                return 'Year ' + tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value + ' million';
            }
        }

        option1.xAxis = {
            data: years,
            name: 'Year',
            nameTextStyle: {
                fontWeight: "bolder"
            }}
        option1.yAxis = {
            name: 'Subscribers (millions)',
            nameTextStyle: {
                fontWeight: "bolder"
             }}
        option1.grid = {
            top: '20%',
            bottom: '3%',
            containLabel: true
        }
        option1.series = [
            {
                name: 'Subscribers',
                data: sub_data_by_years,
                type: 'bar',
            }
        ]

        myChart2.setOption(option1)
    })


option2 = {
    legend: {
        orient: 'vertical',
        left: '85%',
        top: '10%'
    },
    color: ["#eac392", "#9cba8f"],
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
    },
    yAxis: {
        type: 'category',
        data: []
    },


    series: [
        {
            name : "Name A",
            type : 'bar',
            data : []
        },
        {
            name : "Name B",
            type : 'bar',
            data : []
        }
    ]
}


var option2 = JSON.parse(JSON.stringify(option2))
fetch("data\\hours_viewed_in_first_28_days.json")
    .then(response => response.json())
    .then(json => {
        let data = json.data;
        let labels = [];
        let films = [];
        let tvSeries = [];
        let all =[]

        data.forEach(item => {
            if (typeof item.MovieName !== "undefined") {
                labels.push(item.MovieName);
                films.push(Math.floor(item.HoursViewedEng / 1000000));
                tvSeries.push('-');
                all.push(Math.floor(item.HoursViewedEng / 1000000));
            } else if (typeof item.SeriesName !== "undefined") {
                labels.push(item.SeriesName);
                tvSeries.push(Math.floor(item.HoursViewedEng / 1000000));
                films.push('-');
                all.push(Math.floor(item.HoursViewedEng / 1000000));
            }


        })
        option2.title = {
            text: 'The Top 10 most popular Films/TV (English), based on hours viewed in their first 28 days',
            subtext: json.link,
            sublink: json.link,
            left: 'center'
        }
        option2.tooltip = {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (params) {
                var tar = params[0];
                return tar.name + '<br/>' + all[tar.dataIndex] + ' million hours viewed';
            }
        }

        option2.yAxis = {
            data: labels,
            name: "Name",
            nameTextStyle: {
             fontWeight: "bolder"
            }
        }

        option2.xAxis = {
           name: "Hours viewed \n (millions)",
           nameTextStyle: {
            fontWeight: "bolder"
           },
           pos: '50%'
        }

        option2.series = [

            {
                data: films,
                type: 'bar',
                name : "Films",
                barGap: '-100%'
            },
            {
                data: tvSeries,
                type: 'bar',
                name: "TV Series"
            }
        ]

        option2.grid = {
            top: '25%',
            bottom: '3%',
            left: '3%',
            containLabel: true
        }
        myChart3.setOption(option2)

    })//.catch(error => console.error(error))


var option3 = {
  tooltip: {
    trigger: 'axis',
    bodyAlign: 'left'
  },
  grid: {
    top: '20%',
    left: '7%',
    bottom: '3%',
    containLabel: true
  },
    legend: {
      top: '10%'
    },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [],
    nameTextStyle: {
        fontWeight: "bolder"
    }
  },
  yAxis: {
    type: 'value',
    nameTextStyle: {
       fontWeight: "bolder"
    }
  },
  series: [
  {
    data:[]
  }]
};


var option3 = JSON.parse(JSON.stringify(option3))
fetch("data\\movie_genres_by_tickets.json")
    .then(response => response.json())
    .then(json => {
        let data = json.data;
        let genres_by_tickets = [];
        let years = new Set();
        let tickets = [];

        data.forEach(item => {
            genres_by_tickets.push({name: item["genre"], type: 'line', smooth: true, data: Object.values(item).slice(0, -1)});
            for (key in item) {
                if (key != "genre") {
                    years.add(key);
                }
            }
        })
        genres_by_tickets.forEach(item => {
            item.data.forEach(function(part, index, theArray) {
                theArray[index] = Math.floor(part / 1000000);
                })
        });

        option3.title = {
            text: json.text,
            subtext: json.link,
            sublink: json.link,
            left: 'center'
        }

        option3.series = genres_by_tickets;

        option3.xAxis.data = Array.from(years);
        option3.xAxis.name = "Year";

        option3.yAxis.name = "Number of tickets (millions)";

        myChart4.setOption(option3);

    })
