import React, { Component } from 'react'
import Chart from "chart.js";

let myLineChart; 

//--Chart Style Options--//
Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif"
Chart.defaults.global.legend.display = true;
Chart.defaults.global.elements.line.tension = 0;
//--Chart Style Options--//


// Things I don't understand about this code: 
// 1.) The use of React.createRef()
// 2.) The use of componentDidMount()
// 3.) The use of componentDidUpdate() 
// 4.) Passing the ref to the canvas element
// 5.) Where the canvas element came from??? 

export default class LineGraph extends Component {
    chartRef = React.createRef();

    componentDidMount() {
        this.buildChart();
        
        // setInterval(() => this.addData(), 5000); 
    }

    componentDidUpdate() {
        this.buildChart();
    }

    addData = () => {
        myLineChart.data.labels.push('X');
        myLineChart.data.datasets.forEach(dataset => {
            dataset.data.push( Math.floor( 100 * Math.random() ) );
        });
        myLineChart.update();

        console.log(`[Dashboard.js]: ${ this.props.draftSpaceContent }`);
    }

    

    
    buildChart =() => {
        const myChartRef = this.chartRef.current.getContext("2d");

        myLineChart = new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: ['0', '1', '2',
                    '3', '4'],
                datasets: [
                    {
                        label: 'Ethics',
                        fill: false,
                        lineTension: 0.5,
                        backgroundColor: 'rgba(75,192,192,1)',
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 2,
                        data: [65, 59, 80, 81, 56]
                    },
                    {
                        label: 'Epistemology',
                        fill: false,
                        lineTension: 0.5,
                        backgroundColor: 'rgba(715,92,192,1)',
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 2,
                        data: [21, 43, 26, 14, 86]
                    },
                    {
                        label: 'Logic',
                        fill: false,
                        lineTension: 0.5,
                        backgroundColor: 'rgba(75,12,192,1)',
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 2,
                        data: [50, 69, 38, 91, 26]
                    }
                ]
            },
            options: {
                //Customize chart options
                responsive: true,
                maintainAspectRatio: true,
            }
        });
    }


    render() {
        return (
            <div onClick={this.addData}>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}