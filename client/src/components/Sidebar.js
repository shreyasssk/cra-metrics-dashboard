import React from 'react';
import { Link } from 'react-router-dom';

class SideBarNav extends React.Component {
	render() {
		return (
			<nav
				className="navbar navbar-expand-lg navbar-light sticky-top"
				style={{ backgroundColor: '#e3f2fd' }}
			>
				<a className="navbar-brand">
					{window.location.pathname.toLocaleUpperCase().split('/')}
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						<Link to="/system">
							<li className="nav-item nav-link">System</li>
						</Link>
						<Link to="/process">
							<li className="nav-item nav-link">Process</li>
						</Link>
					</ul>
				</div>
			</nav>
		);
	}
}

export default SideBarNav;
