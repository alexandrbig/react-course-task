import React from 'react';
import {connect} from "react-redux";
import {getCharacter, characterLoading} from "../../selectors";
import {fetchCharacterById} from "../../actions/character";
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons/faUserCircle";
import style from './style.css';

class CharacterLink extends React.Component {

	componentDidMount() {
		if (!this.props.character) {
			this.props.fetchCharacterById(this.props.id);
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (!this.props.character && !this.props.isLoading) {
			this.props.fetchCharacterById(this.props.id || 1);
		}
	}

	render() {
		const {character} = this.props;
		if (!character || !character.name) return null;
		return <span className={style.characterLink}>
			<FontAwesomeIcon icon={faUserCircle}/> <NavLink to={'/people/' + character.id}
															className={style.link}>{character.name}</NavLink>
		</span>;
	}
}

export default connect((state, props) => ({
	character: getCharacter(state, props),
	isLoading: characterLoading(state, props)
}), {fetchCharacterById})(CharacterLink)
