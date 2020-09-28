import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Analytics.css';
import {fetchStatistics} from "../../store/actions/StatisticsActions";
import Chart from 'chart.js';

class Analytics extends Component {

    state = {
      assembly: '',
      profit: '',
      rebate: '',
        sales: '',
        allSales:'',
    };

    async componentDidMount() {
        if(!this.props.user|| this.props.user.role !== 'admin'){
            this.props.history.push('/computers');
        }else {
            await this.props.fetchStatistics();
            this.props.statistics && Object.keys(this.props.statistics).forEach(statics => {
                const assembly = [];
                const price = [];
                const rebate = [];
                for (let i = 0; i < this.props.statistics[statics].assembly.length; i++) {
                    const assemblyReduce = parseInt(this.props.statistics[statics].assembly[i]);
                    assembly.push(assemblyReduce);
                }
                for (let i = 0; i < this.props.statistics[statics].price.length; i++) {
                    const priceReduce = parseInt(this.props.statistics[statics].price[i]);
                    price.push(priceReduce);
                }
                for (let i = 0; i < this.props.statistics[statics].rebate.length; i++) {
                    const newPriceReduce = parseInt(this.props.statistics[statics].rebate[i]);
                    rebate.push(newPriceReduce);
                }
                const profit = [price.reduce((a,b) => a + b) - assembly.reduce((a,b) => a + b) - rebate.reduce((a,b) => a + b)];
                this.setState({
                    assembly: assembly.reduce((a, b) => a + b),
                    profit: profit.reduce((a, b) => a + b),
                    rebate: rebate.reduce((a, b) => a + b),
                    sales: this.props.statistics[statics].price.length,
                    allSales: price.reduce((a,b) => a + b) - rebate.reduce((a,b) => a + b),
                });
            });
            const ctx = document.getElementById('myChart');
            Chart.defaults.global.defaultFontFamily = 'monospace';
            Chart.defaults.global.defaultFontColor = 'rgb(186,224,255)';
            Chart.defaults.global.animation.duration = 3000;
            Chart.defaults.global.animation.easing = 'easeOutQuad';
            Chart.defaults.global.elements.line.borderWidth = 2;
            Chart.defaults.global.elements.line.borderCapStyle = 'rgba(122,234,456)';
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Количество Продаж','Сумма Сборки','Чистая Прибыль','Сумма Продаж','Сумма Скидки'],
                    datasets: [{
                        data: [this.state.sales, this.state.assembly,this.state.profit, this.state.allSales, this.state.rebate],
                        backgroundColor: [
                            'rgba(44,255,231,0.2)',
                            'rgba(255,225,0,0.8)',
                            'rgba(53,235,0,0.8)',
                            'rgba(0,235,109,0.8)',
                            'rgba(255,0,16,0.8)',
                        ],
                        borderWidth: 2,
                        radius:7,
                        hoverRadius: 20,
                        borderColor:[
                            '#d7e3ff',
                        ],
                        hoverBorderColor:[
                            'rgba(4,31,255,0.8)',
                            'rgba(154,136,0,0.8)',
                            'rgb(59,168,41)',
                            'rgb(24,168,149)',
                            'rgb(152,14,20)',
                        ],
                        gridLines:{
                            enabled: true,
                        },
                    }]
                },
                options: {
                    layout: {
                        padding: {
                            left: 25,
                            right: 0,
                            top:0,
                            bottom: 0,
                        },
                    },
                    title: {
                        display: true,
                        text:'Статистика Продаж',
                        fontSize: 25,
                        fontFamily: "monospace",
                    },
                    legend: {
                        display: false,
                    },
                }
            });
        }
    }


    shouldComponentUpdate(nextProps, nextState) {
        return nextProps !== this.props || nextState !== this.state;
    }

    render() {
        return (
            <div className="AnalyticsContainer">
                <div className="statistics">
                    <canvas id="myChart"></canvas>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    statistics: state.statistics.statistics,
    user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
    fetchStatistics: () => dispatch(fetchStatistics()),
});
export default connect(mapStateToProps,mapDispatchToProps) (Analytics);