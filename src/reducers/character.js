import {Record} from "immutable";
import {
	FETCH_CHARACTER,
	ERROR,
	START,
	SUCCESS
} from "../constants";
import {arrayToMap} from "../../utils";

const CharacterModel = Record({
	"url": "",
	id: null,
	"name": "",
	"culture": "",
	"gender": "",
	"born": "",
	"died": "",
	"titles": [],
	"aliases": [],
	"father": "",
	"mother": "",
	"spouse": "",
	"allegiances": [],
	"books": [],
	"povBooks": [],
	"tvSeries": [],
	"playedBy": [],
	loading: false,
	loaded: false
});

const CharactersModel = Record({
	entities: arrayToMap([], CharacterModel),
	error: null
});

export default (characters = new CharactersModel(), action) => {
	const {type, payload, error, response} = action;

	switch (type) {
		case FETCH_CHARACTER + START:
			return characters
				.setIn(["entities", payload.id, 'loading'], true)
				.setIn(["entities", payload.id, 'loaded'], false);

		case FETCH_CHARACTER + SUCCESS:
			const character = {...response, id: payload.id};
			return characters
				.setIn(["entities", payload.id], new CharacterModel(character))
				.setIn(["entities", payload.id, 'loading'], false)
				.setIn(["entities", payload.id, 'loaded'], true)
				.set("error", null);

		case FETCH_CHARACTER + ERROR:
			return characters
				.setIn(["entities", payload.id, 'loading'], false)
				.setIn(["entities", payload.id, 'loaded'], true)
				.set("error", error);
		default:
			return characters;
	}
}
