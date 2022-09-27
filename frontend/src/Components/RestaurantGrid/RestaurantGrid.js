import React, { useState } from "react"
import { useSelector } from "react-redux";
import SearchBar from "../SearchBar/SearchBar"
import RestaurantCard from "../RestaurantCard/RestaurantCard"
import { Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap"
import "./RestaurantGrid.css"

export default function RestaurantGrid(props) {

    /** pulls user from redux state */
    const user = useSelector((state) => state.user)

    const [restaurants, setRestaurants] = useState([])

    async function addRestaurants(restaurantsArray) {

        Promise.resolve(restaurantsArray).then(value => {
            if(value !== undefined) {
                setRestaurants(value)
            }
        })
    }

    let displayedRestaurants = restaurants.map((restaurant, i) => {
        let thisFavorite = false
        if(props.favorites !== undefined){
        props.favorites.forEach((fav) => {
            if(fav.favoriteId.restaurantId === restaurant.id){
                thisFavorite = fav.favorite
            }
        })}

        return (<RestaurantCard 
            key={i} 
            index={i}
            restaurant={restaurant} 
            selectRestaurant={props.selectRestaurant} 
            selectedRestaurants={props.selectedRestaurants}
            addFavorite={props.addFavorite}
            userId={user.id}
            hideAddBtn={props.hideAddBtn} 
            hideFavBtn={props.hideFavBtn}
            isFavorite={thisFavorite}
            />)
    })

    return (

        <div>
            <Modal isOpen={props.modal} toggle={props.toggle} className="modal-dialog" scrollable={true} >
                <ModalHeader toggle={props.toggle} className="header">
                    <div className="restaurant--grid-title">
                        Restaurants
                    </div>
                    <div className="restaurant--grid-subtitle">
                        in
                    </div>
                    {/** search results returned from Search Bar */}
                    <SearchBar
                        searchType={'RESTAURANTS_LOCATION'}
                        addRestaurants={addRestaurants}
                        placeholder="Enter a Location or Zip Code"
                    />
                </ModalHeader>
                <ModalBody className="modal-body">
                    <div className="restaurant--grid-display">
                        {displayedRestaurants}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="restaurant--modal-closeBtn" onClick={props.toggle}>Close</button>
                </ModalFooter>
            </Modal>
        </div >
    )
}