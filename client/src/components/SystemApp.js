import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'shards-react';

import CpuGraph from './system/CpuGraph';
import MemoryGraph from './system/MemoryGraph';
import SideBar from './Sidebar';
import system from '../api/system';

const Dashboard = () => {
	const [freeMem, setFreeMem] = useState('');
	const [availMem, setAvailMem] = useState('');
	const [cpuUsage, setCpuUsage] = useState('');
	const [cpuCount, setCpuCount] = useState('');
	const [sysUptime, setSysUptime] = useState('');
	const [sysPlatform, setSysPlatform] = useState('');

	useEffect(() => {
		const interval = setInterval(
			async () =>
				await system.get('/system-metrics').then((res) => {
					const info = res.data;

					setFreeMem(Math.round(info['free_memory']) + 'MB');
					setAvailMem(Math.round(info['total_memory']) + ' MB');
					setCpuUsage(
						Math.round(info['cpu_usage'] * 1000) / 10 + '%'
					);
					setSysPlatform(info['platform']);
					setSysUptime(info['sys_uptime'] + ' secs');
					setCpuCount(info['cpu_count']);
				}),
			1000
		);
	}, []);

	return (
		<Container fluid className="main-content-container px-4">
			<SideBar />
			<br />
			<Row>
				<Col className="col-lg mb-4">
					<div
						style={{ backgroundColor: 'rgb(255,250,250)' }}
						className="jumbotron card jumbotron-fluid"
					>
						<h1 className="display-4">
							System Performance Metrics
						</h1>
						<h2>
							Platform :{' '}
							{sysPlatform ? (
								sysPlatform
							) : (
								<span style={{ fontSize: '30px' }}>
									--unavailable--
								</span>
							)}{' '}
						</h2>
					</div>
					{sysPlatform ? (
						<div style={{ padding: '5px' }}>
							<div className="card">
								<div className="card-body">
									<h4 className="card-title">
										Available Memory :{' '}
										{availMem ? (
											availMem
										) : (
											<span style={{ fontSize: '20px' }}>
												--unavailable--
											</span>
										)}
									</h4>
									<h4 className="card-title">
										Free Memory :{' '}
										{freeMem ? (
											freeMem
										) : (
											<span style={{ fontSize: '20px' }}>
												--unavailable--
											</span>
										)}
									</h4>
									<h4 className="card-title">
										Cpu Usage :{' '}
										{cpuUsage ? (
											cpuUsage
										) : (
											<span style={{ fontSize: '20px' }}>
												--unavailable--
											</span>
										)}
									</h4>
									<h4 className="card-title">
										Cpu Count :{' '}
										{cpuCount ? (
											cpuCount
										) : (
											<span style={{ fontSize: '20px' }}>
												--unavailable--
											</span>
										)}
									</h4>
									<h4 className="card-title">
										System Uptime :{' '}
										{sysUptime ? (
											sysUptime
										) : (
											<span style={{ fontSize: '20px' }}>
												--unavailable--
											</span>
										)}
									</h4>
								</div>
							</div>
						</div>
					) : (
						<div style={{ padding: '5px' }}>
							<div className="card">
								<div className="card-body">
									<h2 className="card-title">Loading...</h2>
									<h4>Fetching data</h4>
								</div>
							</div>
						</div>
					)}
				</Col>
			</Row>

			{sysPlatform ? (
				<Row>
					<Col lg="6" md="6" sm="12" className="mb-4">
						<Card>
							<div style={{ padding: '10px' }}>
								<CpuGraph />
							</div>
						</Card>
					</Col>
					<Col lg="6" md="6" sm="12" className="mb-4">
						<Card>
							<div style={{ padding: '10px' }}>
								<MemoryGraph />
							</div>
						</Card>
					</Col>
				</Row>
			) : (
				<Row>
					<Col lg="6" md="6" sm="12" className="mb-4">
						<div></div>
					</Col>
				</Row>
			)}
		</Container>
	);
};

export default Dashboard;
