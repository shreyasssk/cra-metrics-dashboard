import React from 'react';
import './processlist.css';

import system from '../../api/system';

class ProcessList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
		};
	}

	componentDidMount() {
		setInterval(async () => {
			await system.get('/process-list').then((res) => {
				try {
					this.setState({ data: res.data });
				} catch (err) {
					console.log('ProcessList.js', err);
				}
			});
		}, 1000);
	}

	getRowData = () => {
		const x = this.state.data;

		return x.map((i) => {
			return (
				<tr key={i.pid}>
					<th className="col-3">{i.name}</th>
					<td className="col-3">{i.cpu}</td>
					<td className="col-3">{i.pmem}</td>
					<td className="col-3">
						{i.pid}
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
		const x = this.state.data;

		if (x.length !== 0) {
			return (
				<div style={{ overflowX: 'auto' }}>
					<h4>Running Process List :</h4>
					<div className="table-responsive">
						<table className="table table-fixed">
							<thead className="thead-dark">
								<tr>
									<th scope="col" className="col-3">
										name
									</th>
									<th scope="col" className="col-3">
										cpu
									</th>
									<th scope="col" className="col-3">
										memory
									</th>
									<th scope="col" className="col-3">
										pid
									</th>
								</tr>
							</thead>
							<tbody>{this.getRowData()}</tbody>
						</table>
					</div>
				</div>
			);
		}

		if (x.length === 0) {
			return (
				<div>
					<h1>Loading...</h1>
					<h2>Please wait fetching data...</h2>
				</div>
			);
		}
	}
}

export default ProcessList;
