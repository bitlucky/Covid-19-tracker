import React , {useState , useEffect} from 'react'
import {Line, options} from 'react-chartjs-2';

function LineGraph() {
    const [data , setData ] = useState({});

        //to get the difference between the last date and current date
        const buildChartData = (data, casesType='cases') => {
            let chartData = [];
            let lastDataPoint;
            data[casesType].forEach((date) =>  {
              if (lastDataPoint) {
                const  newDataPoint = {
                  x: date,
                  y: data[casesType][date] - lastDataPoint,
                };
                chartData.push(newDataPoint);
              }
              lastDataPoint = data[casesType][date];
            });
            return chartData;
          };
    
    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then(response => response.json())
        .then(data => {
            //some clever stuff
            const chartData = buildChartData(data);
            setData(chartData);
        })
    },[])


    
    return (
        <div>
            <Line data={{
                datasets : [{
                    backgroundColor: "rgba(204, 16, 52, 0.5)",
                    borderColor: "#CC1034",
                    data: data
                },
            ],

            }}
            options = {options}
            /> 
        </div>
    )
}

export default LineGraph
