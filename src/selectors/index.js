import {createSelector} from "reselect";
import {idFromURL} from "../../utils";

const housesSelector = state => state.houses.entities;
const openedPage = (state, props) => props.match.params.page || 1;

export const housesIsLoading = (state) => state.houses.isLoading;

export const houseListSelector = createSelector(
	housesSelector,
	houses => houses.valueSeq ? houses.valueSeq().toArray() : []
);

export const getHouses = createSelector(
	[houseListSelector, openedPage],
	(houseListSelector, openedPage) => {
		return houseListSelector.filter(item => item.page === openedPage)
	}
);

const charactersSelector = state => state.character.get('entities');
const characterId = (state, props) => props.id || props.match.params.id || 1;
const houseId = (state, props) => props.house.id;
const houseSwornMembers = (state, props) => props.house.swornMembers || [];

export const areCharactersLoaded = createSelector(
	charactersSelector,
	houseSwornMembers,
	houseId,
	(charactersSelector, houseSwornMembers) => {
		return houseSwornMembers.length && houseSwornMembers.every(member => {
			const id = idFromURL(member);
			const character = charactersSelector.get(id);
			return character && character.loaded;
		});
	}
);

export const getCharacter = createSelector(
	[charactersSelector, characterId],
	(charactersSelector, id) => {
		return charactersSelector.get(id);
	}
);


export const characterLoading = createSelector(
	[getCharacter],
	(getCharacter) => {
		return getCharacter && getCharacter.loading
	}
);
