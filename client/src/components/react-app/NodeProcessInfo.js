import React from 'react';

const NodeProcessInfo = ({ processData, graphData }) => {
	if (processData.length === 0) {
		return (
			<div>
				<h1>Process Details</h1>
				<h4>No process selected</h4>
			</div>
		);
	}
	const cpuValue = (processData.cpu * 1024) / 100;
	return (
		<div>
			<h1>Process Details</h1>
			<div className="card-body">
				<h4>Name: {processData.name} </h4>
				<p>
					OWNER: {processData.owner} <br />
					PID: {processData.pid} <br />
					PPID: {processData.ppid} <br />
					PATH: {processData.path} <br />
					THREADS: {processData.threads} <br />
					PRIORITY: {processData.priority} <br />
					CMDLINE: {processData.cmdline} <br />
					UPTIME: {processData.utime} <br />
					<span style={{ fontWeight: 'bold' }}>
						MEMORY [bytes]: {processData.pmem} <br />
						CPU [approx %]: {cpuValue} <br />
					</span>
					<button
						type="button"
						className="btn table-button btn-dark btn-sm"
						onClick={() => graphData(processData.pid)}
					>
						plot graph
					</button>
				</p>
			</div>
		</div>
	);
};

export default NodeProcessInfo;
