import {ERROR, FETCH_HOUSES, START, SUCCESS, TOGGLE_HOUSE} from "../constants";

export const fetchHouses = page => async dispatch => {
	dispatch({
		type: FETCH_HOUSES + START,
		payload: {page}
	});

	try {
		const res = await fetch("https://www.anapioficeandfire.com/api/houses?page=" + page + "&pageSize=10");
		const response = await res.json();

		dispatch({
			response,
			type: FETCH_HOUSES + SUCCESS,
			payload: {page}
		});
	} catch (error) {
		dispatch({
			error,
			type: FETCH_HOUSES + ERROR,
			payload: {page}
		});
	}
};

export const toggleHouse = (id, isOpen) => async dispatch => {
	dispatch({
		type: TOGGLE_HOUSE,
		payload: {id, isOpen}
	});
};
