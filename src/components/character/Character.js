import React from 'react';
import {connect} from "react-redux";
import {characterLoading, getCharacter} from "../../selectors";
import {fetchCharacterById} from "../../actions/character";
import Loader from "../loader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
	faBabyCarriage,
	faFemale,
	faUserShield,
	faIdCard,
	faMale,
	faPassport,
	faSkull,
	faTheaterMasks
} from "@fortawesome/free-solid-svg-icons";
import style from './style.css';
import {Link} from "react-router-dom";

class Character extends React.Component {
	get id() {
		const {match} = this.props;
		const {params} = match;
		const {id = 1} = params;

		return id;
	}

	componentDidMount() {
		if (isNaN(this.id)) {
			this.props.history.replace('/people')
		}
		if (!this.props.character) {
			this.props.fetchCharacterById(this.id);
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (!this.props.character && !this.props.isLoading) {
			this.props.fetchCharacterById(this.id || 1);
		}
	}

	getBody() {
		const {character} = this.props;

		if (!character) return null;

		return (<section className={style.details}>
			<p><FontAwesomeIcon icon={faIdCard}/><span>{character.name}</span></p>
			{character.gender && <p><FontAwesomeIcon icon={character.gender === 'Male' ? faMale : faFemale}/>
				<span>{character.gender}</span></p>}
			{character.aliases && <p><FontAwesomeIcon
				icon={faPassport}/><span>{character.aliases.join(', ') || '-'}</span></p>}
			{character.titles && <p><FontAwesomeIcon
				icon={faUserShield}/><span>{character.titles.join(', ') || '-'}</span></p>}
			<p><FontAwesomeIcon icon={faTheaterMasks}/><span>{character.culture || '-'}</span></p>
			<p><FontAwesomeIcon icon={faBabyCarriage}/><span>{character.born || '-'}</span></p>
			<p><FontAwesomeIcon icon={faSkull}/><span>{character.died || '-'}</span></p>
		</section>)
	}

	render() {
		const {character} = this.props;
		return <section className={style.character}>
			{(!character || character.loading) && <Loader/>}
			{character && character.loaded && this.getBody()}
			<Link to="" onClick={this.props.history.goBack}>Back</Link>
		</section>;
	}
}


export default connect((state, props) => ({
	character: getCharacter(state, props),
	isLoading: characterLoading(state, props)
}), {fetchCharacterById})(Character)
