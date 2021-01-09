import React from 'react'
import {useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux'
import { getHistoricalData } from '../Redux/action'
import numeral from "numeral";

const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };

function LineGraph({casesTypes = "cases"}) {
   
    let data = useSelector((state) => state.pastData)
    const dispatch = useDispatch()

    const buildChartData = (data ,casesType ) => {// be default it will take cases
        let chartData = []
        let lastDataPoint;
        for( let date in data.cases) { // be default it will take cases 
            if(lastDataPoint){
                let newDataPoint = {
                    x : date,
                    y : data[casesType][date] - lastDataPoint,
                    // difference between the present date cases and last date for new cases
                };
                chartData.push(newDataPoint)
            }
            lastDataPoint = data[casesType][date]
        };
        return chartData
    };

    useEffect(() => {
        dispatch(getHistoricalData())
    }, [casesTypes])
    let chartData = buildChartData(data, "cases");
    return (
        <div>
            {chartData && chartData.length > 0 && (
                <Line options={options}
                    data ={{
                        datasets : [
                            {
                                backgroundColor:'rgba(204,16,52,0.5)',
                                borderColor : "#CC1034",
                                data : chartData
                            }
                        ]
                }}/>
            )} 
        </div>
    )
}

export default LineGraph