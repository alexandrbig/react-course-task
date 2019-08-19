import {ERROR, FETCH_CHARACTER, START, SUCCESS} from "../constants";

export const fetchCharacterById = id => async dispatch => {
	dispatch({
		type: FETCH_CHARACTER + START,
		payload: {id}
	});

	if (!id) {
		dispatch({
			type: FETCH_CHARACTER + ERROR,
			error: "Unknown user, no ID provided"
		});
	}

	try {
		const res = await fetch("https://www.anapioficeandfire.com/api/characters/" + id);
		const response = await res.json();

		dispatch({
			response,
			type: FETCH_CHARACTER + SUCCESS,
			payload: {id}
		});
	} catch (error) {
		dispatch({
			error,
			type: FETCH_CHARACTER + ERROR
		});
	}

};
