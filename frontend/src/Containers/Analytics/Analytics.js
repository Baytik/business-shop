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
    };

    async componentDidMount() {
        if(!this.props.user|| this.props.user.role !== 'admin'){
            this.props.history.push('/computers');
        }else {
            await this.props.fetchStatistics();
            this.props.statistics && Object.keys(this.props.statistics).forEach(statics => {
                const assembly = [];
                const price = [];
                const newPrice = [];
                for (let i = 0; i < this.props.statistics[statics].assembly.length; i++) {
                    const assemblyReduce = parseInt(this.props.statistics[statics].assembly[i]);
                    assembly.push(assemblyReduce);
                }
                for (let i = 0; i < this.props.statistics[statics].price.length; i++) {
                    const priceReduce = parseInt(this.props.statistics[statics].price[i]);
                    price.push(priceReduce);
                }
                for (let i = 0; i < this.props.statistics[statics].newPrice.length; i++) {
                    const newPriceReduce = parseInt(this.props.statistics[statics].newPrice[i]);
                    newPrice.push(newPriceReduce);
                }
                const profit = [price.reduce((a,b) => a + b) - assembly.reduce((a,b) => a + b) - newPrice.reduce((a,b) => a + b)];
                this.setState({
                    assembly: assembly.reduce((a, b) => a + b),
                    profit: profit.reduce((a, b) => a + b),
                    rebate: newPrice.reduce((a, b) => a + b),
                    sales: this.props.statistics[statics].price.length,
                });
            });
            const ctx = document.getElementById('myChart');
            Chart.defaults.global.defaultFontFamily = 'monospace';
            Chart.defaults.global.defaultFontColor = 'rgb(186,224,255)';
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Продаж','Сборка','Прибыль', 'Скидки'],
                    datasets: [{
                        data: [this.state.sales, this.state.assembly,this.state.profit, this.state.rebate],
                        backgroundColor: [
                            'rgba(0,243,255,0.8)',
                            'rgba(255,225,0,0.8)',
                            'rgba(53,235,0,0.8)',
                            'rgba(255,0,16,0.8)',
                        ],
                        borderWidth: 2,
                        fill: false,
                        radius:7,
                        hoverRadius: 12,
                        borderColor:[
                            '#468add',
                        ],
                        hoverBorderColor:[
                            'rgba(4,31,255,0.8)',
                            'rgba(255,225,0,0.8)',
                            'rgb(82,235,58)',
                            'rgb(255,24,34)',
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