import React from 'react';
import { Container, Row, Col } from 'shards-react';

import SideBarNav from './Sidebar';
import ProcessList from './processes/ProcessList';
import ProcessDetail from './processes/ProcessDetail';

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
									<h4 className="card-title">
										Running Process List :
									</h4>
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
			</Container>
		);
	}
}

export default ProcessApp;
