import React from "react";
import {Link} from "react-router-dom";

import "./MintImage.css";

export default class MintImage extends React.Component {

	render() {
		const {exobit} = this.props;
		
		return (
			<div className="mint-image">
					<Link to={'/mint/' + exobit}>
						<img src={'https://exobits.greenzeta.com/i/' + exobit} alt="Exobit Preview"/>
					</Link>
			</div>
		);
	}
}