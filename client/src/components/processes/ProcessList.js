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
					<td className="col-3">{i.ppid}</td>
					<td className="col-3">
						{i.threads}
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
									ppid
								</th>
								<th scope="col" className="col-3">
									threads
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

export default ProcessList;
