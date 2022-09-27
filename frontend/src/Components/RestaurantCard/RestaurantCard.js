import { React, useState, useEffect } from "react"
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap"
import { getRestaurantById } from "../SearchBar/SearchFunctions"
import RestaurantHours from "./RestaurantHours"
import { Rating } from 'react-simple-star-rating'
import axios from "axios"
import { baseUrl } from "../../Shared/baseUrl"
import "./RestaurantCard.css"

export default function RestaurantCard(props) {

    /** takes restaurant data as prop 
     * interates restaurant categories for display
    */
    const categories = props.restaurant.categories
    const categoryTitles = categories.map((category, i) => {
        if (i < categories.length - 1) { return category.title + " | " }
        else { return category.title }
    })

    const [modal, setModal] = useState(false);

    /** holds more detailed restaurant info from API */
    const [restaurantDetails, setRestaurantDetails] = useState({})

    const [hours, setHours] = useState()

    /** takes favorite state as a prop */
    const [favorite, setFavorite] = useState(props.isFavorite)

    /** sends an API request for more info when user clicks hours button */
    useEffect(() => {
        Promise
            .resolve(getRestaurantById(props.restaurant.id))
            .then(value => {
                setRestaurantDetails(value)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modal])

    /** controls Hours popup */
    const toggle = () => {
        if (restaurantDetails.hours !== undefined) {
            setModal(!modal)
            let resthours = restaurantDetails.hours[0].open.map((object, i) => {
                return (<RestaurantHours key={i} object={object} />)
            })
            setHours(resthours)
        }
    }


    async function saveFavorite() {
       
        /** updates state and saves favorite data in database when restaurant is
         * favorited or unfavorited
         */
        setFavorite(prevFav => !prevFav)

        const data = {
            restaurantId: props.restaurant.id,
            restaurantName: props.restaurant.name,
            restaurantImage: props.restaurant.image_url,
            favorite: !favorite,
        }

        Promise.resolve(axios.post(baseUrl + '/user/id/' + props.userId + '/favorite', data))
            .then(() => {
                props.addFavorite()
            })
    }

    return (
        <div>
            <div className="restaurant--container">
                <div className='restaurant--name'>{props.restaurant.name}</div>
                <div className='restaurant--type'>{categoryTitles}</div>
                <Rating className="rating" initialValue={props.restaurant.rating} readonly={true} />
                <div className='restaurant--address'>
                    {/** address links to lcoation on google maps */}
                    <a href={"https://www.google.com/maps/search/?api=1&query=" + String(props.restaurant.location.display_address)} target="_blank" rel="noreferrer">
                        {props.restaurant.location.display_address[0] + " "}
                        {props.restaurant.location.display_address[1] + " "}<br />
                        {props.restaurant.location.display_address[2]}
                    </a>
                </div>
                {/** phone number opens call */}
                <a className="restaurant--phone" href={"tel:" + props.restaurant.display_phone}>{props.restaurant.display_phone}</a>
                <img className='restaurant--image' src={props.restaurant.image_url} alt="restaurant visual" />


                <Modal isOpen={modal} toggle={toggle} className="hours--modal-dialog" contentClassName="hours--modal-content" scrollable={true}>
                    <ModalHeader className="hours--modal-header">
                        {props.restaurant.name} Hours <br />
                        {/**display is restaurant is currently open or closed */}
                        {restaurantDetails.hours === undefined ? '' : restaurantDetails.hours[0].is_open_now ? <span className="badge open">Open Now</span> : <span className="badge closed">Closed</span>}
                    </ModalHeader>
                    <ModalBody className="hours--modal-body">
                        {hours === undefined ? <></> : <>{hours}</>}
                    </ModalBody>
                    <ModalFooter className="hours--modal-footer">
                        <button className="hours--modal-closeBtn" onClick={toggle}>Close</button>
                    </ModalFooter>
                </Modal>
                <div className="restaurant--buttons">
                    <button className="restaurant--hoursBtn" onClick={toggle}>Hours</button>
                    {props.hideFavBtn ? <></> :
                        <button className={!favorite ? "restaurant--favoriteBtn" : "restaurant--favoriteBtn favorited" } onClick={saveFavorite}>
                            <span className="favoriteBtn-text">Add to Favorites</span>
                            <span className="favoriteBtn-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                            </span>
                        </button>}
                    {props.hideAddBtn ? <></> :
                        <><button
                            className= "addBtn"
                            onClick={() => props.selectRestaurant(props.restaurant)}
                            disabled={props.selectedRestaurants.length >= 5 ||
                                props.selectedRestaurants.includes(props.restaurant)}
                            id="addBtn"
                        >
                            <span className="addBtn-text">
                                {props.selectedRestaurants.length >= 5 ? "Limit Reached" : props.selectedRestaurants.includes(props.restaurant)? "Already Added" : "Add to Event"}
                            </span>
                            <span className="addBtn-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16">
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                </svg>
                            </span>
                        </button>
                        </>}
                </div>
            </div>
        </div>
    )
}


