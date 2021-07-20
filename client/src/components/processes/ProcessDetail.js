import React, { useEffect, useState } from 'react';
import { Form, Button } from 'shards-react';
import system from '../../api/system';

const ProcessDetail = ({ processData }) => {
	const [processDetails, setProcessDetails] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			const { data } = await system.get(
				`/process-list/${processData.pid}`
			);
			setProcessDetails(data[0]);
		};
		const timeoutID = setInterval(() => {
			if (processData.length !== 0) {
				fetchData();
			}
		}, 1000);

		return () => {
			clearInterval(timeoutID);
		};
	}, [processData]);

	const onFormSubmit = async (e) => {
		var pidValue = e.target.value;
		const terminateProcess = async () => {
			const { data } = await system.get(`/terminate/${pidValue}`);
			window.location.reload();
			console.log(data);
		};
		terminateProcess();
		console.log(pidValue);
	};

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
						MEMORY: {Math.round(processDetails.pmem / 1000)} kB{' '}
						<br />
						CPU: {processDetails.cpu} % <br />
					</span>
				</p>
				<Button
					onClick={onFormSubmit}
					value={processData.pid}
					size="lg"
					theme="danger"
				>
					kill
				</Button>
			</div>
		</div>
	);
};

export default ProcessDetail;
