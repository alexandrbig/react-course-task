import React from 'react';
import SVGInline from 'react-svg-inline';
import iconSVG from "../../assets/loader.svg"
import style from './style.css'

export default function Loader() {
	return (
		<div className={style.loader}>
			<SVGInline svg={iconSVG} fill={'#000'} className={style.icon}/>
		</div>
	)
}
