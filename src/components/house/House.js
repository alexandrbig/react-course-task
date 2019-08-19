import React from 'react';
import {areCharactersLoaded} from "../../selectors";
import {idFromURL} from "../../../utils";
import CharacterLink from "../character/CharacterLink";
import Loader from "../loader";
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDungeon, faShieldAlt, faAngleDoubleDown, faAngleDoubleUp} from "@fortawesome/free-solid-svg-icons";
import style from './style.css'
import {toggleHouse} from "../../actions/houses";

class House extends React.Component {

	getPeople(house) {
		if (!house || !house.swornMembers) return null;

		const memberIds = house.swornMembers.map(member => {
			return idFromURL(member)
		});

		return memberIds.map(id =>
			<div key={id}>
				<CharacterLink id={id}/>
			</div>
		)
	}

	toggleOpen = () => {
		const {house} = this.props;
		this.props.toggleHouse(house.id, !house.isOpen);
	};

	render() {
		const {house, isLoaded} = this.props;
		const {isOpen} = house;

		return <section key={house.id} className={style.house}>
			<div>
				<FontAwesomeIcon icon={faDungeon}/>
				{house.swornMembers.length ?
					<span className={style.toggle} onClick={this.toggleOpen}> {house.name} <FontAwesomeIcon
						icon={isOpen ? faAngleDoubleUp : faAngleDoubleDown}/></span> :
					<span className={style.name}> {house.name} </span>
				}
			</div>
			{isOpen &&
			<section>
				{house.words && <p><strong><FontAwesomeIcon icon={faShieldAlt}/> {house.words} </strong></p>}
				<div className={style.members}>
					{!isLoaded && <Loader/>}
					<div className={style[!isLoaded ? 'hidden' : 'visible']}>{this.getPeople(house)}</div>
				</div>
			</section>
			}
		</section>;
	}
}


export default connect((state, props) => ({
	isLoaded: areCharactersLoaded(state, props)
}), {toggleHouse})(House)

