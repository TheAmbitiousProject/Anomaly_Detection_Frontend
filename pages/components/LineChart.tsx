import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import jsonData from '../reports/data/anomalies_data.json';
import tw from 'tailwind-styled-components';

/*
const ChartContainer = tw.div`
  mx-auto
  max-w-screen-md
  mt-10
  pb-5
`;

const LineChart = () => {
  const chartRef = useRef(null);
  const anomaliesLabels = Object.values(jsonData).map(item => item.month);
  const anomaliesData = Object.values(jsonData).map(item => item.amount);

  useEffect(() => {
    let chart = null;
    const canvas = chartRef.current;
    const ctx = canvas.getContext('2d');

    if (chart !== null) {
      chart.destroy();
    }

    chart = new Chart(ctx, {
      type: 'line',
      data: {
        // labels: jsonData.map((dataPoint) => dataPoint.date),
        labels: anomaliesLabels,
        datasets: [
          {
            label: 'Data',
            // data: jsonData.map((dataPoint) => dataPoint.value),
            data: anomaliesData,
            fill: false,
            borderColor: '#5A67D8',
            borderWidth: 2,
            pointBackgroundColor: '#fff',
            pointRadius: 5,
            pointHoverRadius: 7,
            // yAxisID: 'yAxis',
          },
        ],
      },
      options: {
        scales: {
          YAxes: [
            {
            //   ticks: {
            //     beginAtZero: true,
            //   },
            // type: 'time',
            ticks: {
                min: -5, // Set the minimum value of the scale
                max: 10,
              },
            },
          ],
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <ChartContainer>
      <canvas ref={chartRef} />
    </ChartContainer>
  );
};

export default LineChart;
*/

export default function LineChart(){
    /*
    $.getJSON("https://jsonblob.com/api/jsonBlob/26078b70-6b6f-11e7-a38a-bf689f57642c", function(data) 
    {
        var labels = data.customers[0].amounts.map(function(e) {
            return e[0];
        });
        var data = data.customers[0].amounts.map(function(e) {
            return e[1];
        });
        */

            

        console.log(jsonData)   
        const labels = Object.values(jsonData.anomalies).map(item => item.month);
        const data = Object.values(jsonData.anomalies).map(item => item.amount);

        useEffect(() => {
                let chart = null;

                if (chart !== null) {
                    chart.destroy();
                }

                var ctx = document.getElementById('canvas').getContext('2d');
                    chart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: labels,
                            datasets: [{
                                backgroundColor: '#a3e635',
                                borderColor: '#3ECF8E',
                                data: data
                            }]
                        },
                        options: {
                            responsive: 'true',
                            }
                    });
                return () => {
                    chart.destroy();
                };
            }, [data, labels]);
    // });
    return(
        <div className="">
            <div className="" id='chart'>
            <canvas id="canvas" width="1100" height="150" ></canvas>
            </div>
        </div>
    )
}