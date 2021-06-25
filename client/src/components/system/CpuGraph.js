import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import ApexCharts from 'apexcharts';

import system from '../../api/system';

class CpuData extends Component {
	constructor(props) {
		super(props);

		this.state = {
			options: {
				chart: {
					id: 'cpugraph',
					animations: {
						enabled: true,
						easing: 'linear',
						dynamicAnimation: {
							speed: 1000,
						},
					},
					toolbar: {
						show: false,
					},
					zoom: {
						enabled: false,
					},
				},

				dataLabels: {
					enabled: false,
				},
				stroke: {
					curve: 'smooth',
				},
				title: {
					text: 'Cpu Utilization [Total %]',
					align: 'left',
				},
				markers: {
					size: 0,
				},
				xaxis: {
					type: 'datetime',
					range: 10,
				},
				legend: {
					show: false,
				},
			},
			series: [{ name: 'x', data: [] }],
		};
	}

	componentDidMount() {
		this.updateInterval = setInterval(
			() =>
				system.get('/system-metrics').then((res) => {
					const cpuData = res.data.cpu_usage;

					this.updateData(Math.round(cpuData * 100));
				}),
			1000
		);
	}

	componentWillUnmount() {
		clearInterval(this.updateInterval);
	}

	resetData = () => {
		const { data } = this.state.series[0];

		this.setState({
			series: [{ data: data.slice(data.length - 10, data.length) }],
		});
	};

	updateData = (y) => {
		const x = Math.floor(new Date().getTime() / 1000);

		let { data } = this.state.series[0];
		data.push({ x, y });

		this.setState({ series: [{ data }] }, () => {
			ApexCharts.exec('cpugraph', 'updateSeries', this.state.series);
		});

		// stop data array from leaking memory and growing too big
		if (data.length > 100) this.resetData();
	};

	render() {
		const { options, series } = this.state;

		return (
			<div>
				<Chart
					options={options}
					series={series}
					type="line"
					height="350"
				/>
				<div style={{ paddingLeft: '5px' }}>
					{' '}
					<button
						className="mb-2 mr-1 btn btn-primary"
						onClick={this.resetData}
					>
						Reset
					</button>
				</div>
			</div>
		);
	}
}

export default CpuData;
