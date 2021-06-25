import React from 'react';
import system from '../../api/system';

class NodeProcess extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
		};
	}

	componentDidMount() {
		setInterval(async () => {
			await system.get('/node-metrics').then((res) => {
				this.setState({ data: res.data });
			});
		}, 1000);
	}

	getRowData = () => {
		const x = this.state.data;

		return x.map((i) => {
			return (
				<tr key={i.pid}>
					<th className="col-3">{i.name}</th>
					<td className="col-3">{i.pid}</td>
					<td className="col-3">{(i.cpu * 1024) / 100}</td>
					<td className="col-3">
						{i.pmem}
						<button
							type="button"
							className="btn table-button btn-dark btn-sm"
							onClick={() => this.props.onProcessSelect(i)}
						>
							more info
						</button>
					</td>
				</tr>
			);
		});
	};

	render() {
		if (this.state.data.length === 0) {
			return (
				<div>
					<h1>Oops...</h1>
					<h4>No data available</h4>
				</div>
			);
		}

		return (
			<div>
				<div className="table-responsive">
					<table className="table table-fixed">
						<thead className="thead-dark">
							<tr>
								<th scope="col" className="col-3">
									name
								</th>
								<th scope="col" className="col-3">
									pid
								</th>
								<th scope="col" className="col-3">
									cpu [bytes]
								</th>
								<th scope="col" className="col-3">
									memory [bytes]
								</th>
							</tr>
						</thead>
						<tbody>{this.getRowData()}</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default NodeProcess;
