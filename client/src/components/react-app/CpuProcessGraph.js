import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import ApexCharts from 'apexcharts';

import system from '../../api/system';

class ProcessCpuGraph extends Component {
	constructor(props) {
		super(props);

		this.state = {
			options: {
				chart: {
					id: 'nodegraph',
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
			series: [
				{ name: 'x1', data: [] },
				// { name: 'x2', data: [] },
			],
		};
	}

	getProps() {
		const { graphData } = this.props;
		this.setState({ pid: graphData });
		const x = this.state.pid;
		if (graphData !== 0 || undefined) {
			system.get(`/node-metrics/${x}`).then((res) => {
				// const memData = res.data[0].pmem;
				const cpuData = res.data[0].cpu;

				// const pidMemData = memData / 1000;
				const pidCpuData = (cpuData * 1024) / 100;

				this.updateX1Data(Math.round(pidCpuData));
				// this.updateX2Data(Math.round(pidCpuData));
				// console.log(this.state.series[1]);
				// console.log('Mem', pidMemData);
				console.log('Cpu', pidCpuData);
			});
		}
	}

	componentDidMount() {
		this.updateInterval = setInterval(() => {
			this.getProps();
		}, 1000);
	}

	componentWillUnmount() {
		clearInterval(this.updateInterval);
	}

	resetData = () => {
		const data1 = this.state.series[0].data;
		// const data2 = this.state.series[1].data;

		this.setState({
			series: [
				{ data: data1.slice(data1.length - 10, data1.length) },
				// { data: data2.slice(data2.length - 10, data2.length) },
			],
		});
	};

	updateX1Data = (y) => {
		const x = Math.floor(new Date().getTime() / 1000);

		let { data } = this.state.series[0];
		data.push({ x, y });

		this.setState({ series: [{ data }] }, () => {
			ApexCharts.exec('nodegraph', 'updateSeries', this.state.series);
		});

		// stop data array from leaking memory and growing too big
		if (data.length > 100) this.resetData();
	};

	// updateX2Data = (y) => {
	// 	const x = Math.floor(new Date().getTime() / 1000);

	// 	let { data } = this.state.series[1];
	// 	data.push({ x, y });

	// 	this.setState({ series: [{ data }] }, () => {
	// 		ApexCharts.exec('nodegraph', 'updateSeries', this.state.series);
	// 	});

	// 	// stop data array from leaking memory and growing too big
	// 	if (data.length > 100) this.resetData();
	// };

	render() {
		const { graphData } = this.props;
		const { options, series } = this.state;

		return (
			<div>
				<h1>Memory Utilization [Mib]:</h1>
				<p>PID: {graphData} </p>
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

export default ProcessCpuGraph;
