import React from 'react';
import { Container, Row, Col } from 'shards-react';

import SideBarNav from './Sidebar';

class ReactApp extends React.Component {
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
			</Container>
		);
	}
}

export default ReactApp;
