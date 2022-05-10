var chartDom = document.getElementById('chart');
var chartDom2 = document.getElementById('chart1');
var chartDom3 = document.getElementById('chart2');
var chartDom4 = document.getElementById('chart3');
var myChart = echarts.init(chartDom);
var myChart2 = echarts.init(chartDom2);
var myChart3 = echarts.init(chartDom3);
var myChart4 = echarts.init(chartDom4);

option1 = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },


    legend: {
        orient: 'vertical',
        right: 10,
        top: 'end'
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
            text: 'Annual subscribers (Q2 of each respective year)',
            subtext: json.link,
            sublink: json.link
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

        // console.log(books_data_by_years)

        option1.xAxis = {data: years, name: 'year'}
        option1.yAxis = {name: 'subscribers (mil)'}
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

        myChart.setOption(option1)
    })


option2 = {
    legend: {
        orient: 'vertical',
        right: 10,
        top: 'end'
    },
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
        // console.log(data);
        // console.log(Object.keys(json))
        data.forEach(item => {
            if (typeof item.MovieName !== "undefined") {
                labels.push(item.MovieName);
                films.push(item.HoursViewedEng);
                tvSeries.push('-');
                all.push(item.HoursViewedEng)
            } else if (typeof item.SeriesName !== "undefined") {
                labels.push(item.SeriesName);
                tvSeries.push(item.HoursViewedEng);
                films.push('-');
                all.push(item.HoursViewedEng)
            }


        })
        option2.title = {
            text: 'The Top 10 most popular TV (English), \nbased on hours viewed in their first 28 days.',
            subtext: json.link,
            sublink: json.link
            // left: 'right'
        }
        option2.tooltip = {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (params) {
                console.log(params[0])
                var tar = params[0];
                return tar.name + '<br/>' + all[tar.dataIndex] + ' hours viewed';
            }
        }

        option2.yAxis.data = labels
        option2.yAxis.name = "Name"
        option2.xAxis.name = "Hours viewed"
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
            top: '15%',
            bottom: '3%',
            containLabel: true
        }
        myChart2.setOption(option2)

    }).catch(error => console.error(error))


var option = {
  title: {
    text: 'Top 5 movie genre by tickets grossing from 2020 to 2022',
    subtext: "https://www.the-numbers.com/market/",
    sublink: "https://www.the-numbers.com/market/"
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['20202', '2021', '2022']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Adventure',
      type: 'line',
      smooth: true,
      data: [76612144 , 85974897, 63387897]
    },
    {
      name: 'Action',
      type: 'line',
      smooth: true,
      data: [46852981, 255234837, 112192515]
    },
    {
      name: 'Thriller/Suspense',
      type: 'line',
      smooth: true,
      data: [28739655, 15360638]
    },
    {
      name: 'Horror',
      type: 'line',
      smooth: true,
      data: [26930298, 63313994, 11251694]
    },
    {
      name: 'Drama',
      type: 'line',
      smooth: true,
      data: [26230346 , 25542590, 14453436]
    },
    {
      name: 'Comedy',
      type: 'line',
      smooth: true,
      data: [null, 39354106 , 14369547]
    }
  ]
};

myChart3.setOption(option);
