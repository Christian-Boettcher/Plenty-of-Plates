import React from 'react'
import axios from "axios"
import { baseUrl } from "../../Shared/baseUrl"
import './RestaurantThumbnail.css'

export default function RestaurantThumbnail(props) {

  /** thumnail used for three purposes 
   * - displaying favorites
   * - event's restaurant selections
   * - event confirmation
   */

  async function removeFavorite(e) {
    e.preventDefault();
    /** removes user favorites from database */
    const data = {
      restaurantId: props.restaurant.id,
      restaurantName: props.restaurant.name,
      restaurantImage: props.restaurant.image_url,
      favorite: false,
    }

    Promise.resolve(axios.post(baseUrl + '/user/id/' + props.userId + '/favorite', data))
      .then(() => {
        props.updateFavorites()
      })
  }

  return (
    <div className="restaurant--thumbnail">
      <img className="restaurant--thumbnail-image" src={props.restaurant.image_url} alt="small thumbnail of restaurant" />
      {
        props.showFavBtn ?
          <form onSubmit={(e) => removeFavorite(e)}>
            <button className="restaurant--thumbnail-button" type="submit" onClick={removeFavorite}>
              <span className="text">{props.restaurant.name}</span>
              <span className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                </svg>
              </span>
            </button>
          </form>
          :
          props.eventCreated ?
            <><span className="eventCreated-text">{props.restaurant.name}</span></>
            :
            <button className="restaurant--thumbnail-button" onClick={() => props.removeRestaurant(props.restaurant.id)}>
              <span className="text">{props.restaurant.name}</span>
              <span className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                </svg>
              </span>
            </button>}
    </div>
  )
}