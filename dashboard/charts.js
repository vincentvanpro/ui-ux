var chartDom = document.getElementById('chart');
var chartDom2 = document.getElementById('chart1');
var chartDom3 = document.getElementById('chart2');
var chartDom4 = document.getElementById('chart3');
var myChart = echarts.init(chartDom);
var myChart2 = echarts.init(chartDom2);
var myChart3 = echarts.init(chartDom3);
var myChart4 = echarts.init(chartDom4);


option = {
  title: {
    text: 'Share of streaming services by subscribers in 2021',
    subtext: 'https://mediapeanut.com/streaming-statistics/',
    sublink: 'https://mediapeanut.com/streaming-statistics/'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'right',
    top: '35%'
  },
  series: [
    {
      name: 'Streaming service',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 214000000, name: 'Netflix' },
        { value: 175000000, name: 'Amazon' },
        { value: 118000000, name: 'Disney+' },
        { value: 39700000, name: 'Hulu' },
        { value: 54000000, name: 'Peacock' },
        { value: 69000000, name: 'HBO' }
      ],
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

myChart.setOption(option);


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

        myChart2.setOption(option1)
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
            sublink: json.link,
            // left: 'right'
            top: '1.5%'
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
            top: '25%',
            bottom: '3%',
            containLabel: true
        }
        myChart3.setOption(option2)

    }).catch(error => console.error(error))


var option3 = {
  title: {
    text: 'Top 5 movie genres by tickets grossing \nbetween 2020 and 2022 years',
    subtext: "https://www.the-numbers.com/market/",
    sublink: "https://www.the-numbers.com/market/"
  },
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    top: '20%',
    left: '3%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
    name: "Year"
  },
  yAxis: {
    type: 'value',
    name: "Number of tickets"
  },
  series: [
    {
      name: 'Adventure',
      type: 'line',
      smooth: true,
      data: [367661045, 483468157, 303036646, 326672973, 417538823, 76612144, 85974897, 63387897]
    },
    {
      name: 'Action',
      type: 'line',
      smooth: true,
      data: [360271933, 285656773, 367630855, 452053536, 316329127, 46852981, 255234837, 112192515]
    },
    {
      name: 'Thriller/Suspense',
      type: 'line',
      smooth: true,
      data: [106626152, 92215165, null, null, 123026805, 28739655]
    },
    {
      name: 'Horror',
      type: 'line',
      smooth: true,
      data: [null, null, 123651291, 93417615, 88483577, 26930298, 63313994, 11251694]
    },
    {
      name: 'Drama',
      type: 'line',
      smooth: true,
      data: [245574422, 141071778, 147964974, 177635237, 151412394, 26230346 , 25542590, 14453436]
    },
    {
      name: 'Comedy',
      type: 'line',
      smooth: true,
      data: [146584641, 158413985, null, 89269172, null, null, 39354106 , 14369547]
    },
    {
      name: 'Musical',
      type: 'line',
      smooth: true,
      data: [null, null, 99237710]
    }
  ]
};

myChart4.setOption(option3);
