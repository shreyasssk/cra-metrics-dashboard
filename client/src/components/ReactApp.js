import React from 'react';
import { Container, Row, Col } from 'shards-react';

import SideBarNav from './Sidebar';
import NodeProcess from './react-app/NodeProcess';
import NodeProcessInfo from './react-app/NodeProcessInfo';
import ProcessGraph from './react-app/MemProcessGraph';
import ProcessCpuGraph from './react-app/CpuProcessGraph';

class ReactApp extends React.Component {
	state = { processInfo: [], graphData: 0 };

	onProcessSelect = (childData) => {
		this.setState({ processInfo: childData });
	};

	onGraphSelect = (graphData) => {
		this.setState({ graphData });
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
								REACT Performance Metrics
							</h1>
						</div>
					</Col>
				</Row>
				<Row>
					<Col className="col-lg mb-6">
						<div style={{ padding: '5px' }}>
							<div className="card">
								<div className="card-body">
									<h4 className="card-title">
										Running NODE Process List :
									</h4>
									<NodeProcess
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
									<NodeProcessInfo
										processData={this.state.processInfo}
										graphData={this.onGraphSelect}
									/>
								</div>
							</div>
						</div>
					</Col>
				</Row>
				<Row>
					<Col className="col-lg-4 mb-4">
						<div style={{ padding: '5px' }}>
							<div className="card">
								<div className="card-body">
									<ProcessGraph
										graphData={this.state.graphData}
									/>
								</div>
							</div>
						</div>
					</Col>
					<Col className="col-lg-4 mb-4">
						<div style={{ padding: '5px' }}>
							<div className="card">
								<div className="card-body">
									<ProcessCpuGraph
										graphData={this.state.processInfo}
									/>
								</div>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default ReactApp;
