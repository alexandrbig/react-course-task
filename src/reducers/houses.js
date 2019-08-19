import {Record} from "immutable";
import {
	FETCH_HOUSES,
	ERROR,
	START,
	SUCCESS, TOGGLE_HOUSE
} from "../constants";
import {idFromURL, arrayToMap} from "../../utils";

const HouseModel = Record({
	"url": "",
	"id": null,
	"page": "",
	"name": "",
	"region": "",
	"coatOfArms": "",
	"words": "",
	"titles": [],
	"seats": [],
	"currentLord": "",
	"heir": "",
	"overlord": "",
	"founded": "",
	"founder": "",
	"diedOut": "",
	"ancestralWeapons": [],
	"cadetBranches": [],
	"swornMembers": [],
	isOpen: false,
});

const HousesModel = Record({
	entities: arrayToMap([], HouseModel),
	isLoading: false,
	isLoaded: false,
	error: null,
	page: 1
});

export default (houses = new HousesModel(), action) => {
	const {type, payload, error, response} = action;

	switch (type) {
		case FETCH_HOUSES + START:
			return houses.set('isLoading', true);

		case FETCH_HOUSES + SUCCESS:
			const housesResponse = response.map(item => {
				item.id = idFromURL(item.url);
				item.page = payload.page || 1;
				return item;
			});
			return houses
				.mergeIn(['entities'], arrayToMap(housesResponse, HouseModel))
				.set('page', payload.page)
				.set('isLoading', false)
				.set('isLoaded', false)
				.set("error", null);

		case FETCH_HOUSES + ERROR:
			return houses
				.set('isLoading', false)
				.set('isLoaded', false)
				.set("error", error);

		case TOGGLE_HOUSE:
			return houses.setIn(['entities', payload.id, 'isOpen'], payload.isOpen);

		default:
			return houses;
	}
}
