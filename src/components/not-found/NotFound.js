import React from 'react';
import {NavLink} from "react-router-dom";

export default function NotFound() {
	return (
		<section>
			<h1>The page you are looking for does not exist.</h1>
			<div>Check out <NavLink to={'/houses'}>Houses list</NavLink> instead.</div>
		</section>
	)
}
