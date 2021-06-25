import React from 'react';

const ProcessDetail = ({ processData }) => {
	console.log(processData);

	if (processData.length === 0) {
		return (
			<div>
				<h1>Process Details</h1>
				<h4>No process selected</h4>
			</div>
		);
	}
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
						VIRTUAL MEMORY: {processData.vmem} <br />
						PHYSICAL MEMORY: {processData.pmem} <br />
						CPU: {processData.cpu} <br />
					</span>
				</p>
			</div>
		</div>
	);
};

export default ProcessDetail;
