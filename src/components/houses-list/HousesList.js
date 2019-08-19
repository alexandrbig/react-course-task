import React from 'react';
import {connect} from "react-redux";
import {fetchHouses} from '../../actions/houses'
import {NavLink} from "react-router-dom";
import {getHouses, housesIsLoading} from "../../selectors";
import {fetchCharacterById} from "../../actions/character";
import Loader from "../loader";
import House from "../house";
import style from "./style.css";
import {faAngleDoubleRight, faAngleDoubleLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class HousesList extends React.Component {
	componentDidMount() {
		if (isNaN(this.page)) {
			this.props.history.replace('/houses')
		}
		if (!this.props.houses.length) {
			this.props.fetchHouses(this.page);
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {

		if (!this.props.houses.length && !this.props.isLoading) {
			this.props.fetchHouses(this.page || 1);
		}
	}

	get page() {
		const {match} = this.props;
		const {params} = match;
		const {page = 1} = params;

		return page;
	}

	render() {
		const {houses, isLoading} = this.props;

		return <section className={style.houseList}>
			{isLoading && <Loader/>}
			{!isLoading && houses.map(house => {
				return <House house={house} key={house.id}/>
			})
			}
			<section className={style.navigate}>
				{this.page > 1 && <NavLink to={'/houses/' + (this.page - 1)}><FontAwesomeIcon
					icon={faAngleDoubleLeft}/> Prev Page</NavLink>}
				<NavLink to={'/houses/' + (+this.page + 1)}>Next Page <FontAwesomeIcon
					icon={faAngleDoubleRight}/></NavLink>
			</section>
		</section>;
	}
}

export default connect((state, props) => ({
	houses: getHouses(state, props),
	isLoading: housesIsLoading(state)
}), {fetchHouses, fetchCharacterById})(HousesList)
