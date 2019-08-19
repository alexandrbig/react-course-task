import {OrderedMap} from "immutable";

export const arrayToMap = (arr, DataModel) =>
	arr.reduce(
		(acc, el) => acc.set(el.id, DataModel ? new DataModel(el) : el),
		new OrderedMap({})
	);

export const idFromURL = (url) => url.match(/.*\/(\d+)/)[1];
