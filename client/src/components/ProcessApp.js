import React from 'react';
import { Container, Row, Col, Card } from 'shards-react';

import SideBarNav from './Sidebar';
import ProcessList from './processes/ProcessList';
import ProcessDetail from './processes/ProcessDetail';

// Graph Imports
import ProcessMemGraph from './processes/graph/memGraph';
import ProcessCpuGraph from './processes/graph/cpuGraph';

class ProcessApp extends React.Component {
	state = { processInfo: [] };

	onProcessSelect = (childData) => {
		this.setState({ processInfo: childData });
	};

	render() {
		return (
			<Container fluid className="main-content-container px-4">
				<SideBarNav />
				<br />
				<Row>
					<Col className="col-lg mb-4">
						<div
							style={{ backgroundColor: 'rgb(255,250,250)' }}
							className="jumbotron card jumbotron-fluid"
						>
							<h1 className="display-4">
								System Process Metrics
							</h1>
						</div>
					</Col>
				</Row>
				<Row>
					<Col className="col-lg mb-6">
						<div style={{ padding: '5px' }}>
							<div className="card">
								<div className="card-body">
									<ProcessList
										onProcessSelect={this.onProcessSelect}
									/>
								</div>
							</div>
						</div>
					</Col>
					<Col className="col-lg-4 mb-2">
						<div style={{ padding: '5px' }}>
							<div className="card">
								<div className="card-body">
									<ProcessDetail
										processData={this.state.processInfo}
									/>
								</div>
							</div>
						</div>
					</Col>
				</Row>

				{this.state.processInfo.length !== 0 ? (
					<Row>
						<Col lg="6" md="6" sm="12" className="mb-4">
							<Card>
								<div style={{ padding: '10px' }}>
									<ProcessMemGraph
										processData={this.state.processInfo}
									/>
								</div>
							</Card>
						</Col>
						<Col lg="6" md="6" sm="12" className="mb-4">
							<Card>
								<div style={{ padding: '10px' }}>
									<ProcessCpuGraph
										processData={this.state.processInfo}
									/>
								</div>
							</Card>
						</Col>
					</Row>
				) : (
					<Row>
						<Col lg="12" md="12" sm="12" className="mb-8">
							<Card>
								<div style={{ padding: '10px' }}>
									<br />
									<h1>
										Please select a process to plot the
										graph
									</h1>
									<br />
								</div>
							</Card>
						</Col>
					</Row>
				)}
			</Container>
		);
	}
}

export default ProcessApp;
