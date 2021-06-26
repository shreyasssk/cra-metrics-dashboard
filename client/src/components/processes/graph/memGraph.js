import React from 'react';
import Chart from 'react-apexcharts';
import ApexCharts from 'apexcharts';

import system from '../../../api/system';

class ProcessMemGraph extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			memData: '',
			options: {
				chart: {
					id: 'memgraph',
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
					text: 'Free Memory [MiB] ',
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
			series: [{ name: 'freemem', data: [] }],
		};
	}

	getProps() {
		const { processData } = this.props;
		if (processData.length !== 0) {
			(async () => {
				const { data } = await system.get(
					`/process-list/${processData.pid}`
				);
				const x = Math.round(data[0].pmem / 1000).toFixed(2);
				this.updateData(x);
				console.log('Data: ', x);
			})();
		}
	}

	componentDidMount() {
		this.updateInterval = setInterval(() => this.getProps(), 1000);
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
			ApexCharts.exec('memgraph', 'updateSeries', this.state.series);
		});

		// stop data array from leaking memory and growing too big
		if (data.length > 100) this.resetData();
	};

	render() {
		const { options, series } = this.state;
		const { processData } = this.props;

		return (
			<div className="mixed-chart">
				<h1>{processData.name}</h1>
				<h1>Hello</h1>
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

export default ProcessMemGraph;
