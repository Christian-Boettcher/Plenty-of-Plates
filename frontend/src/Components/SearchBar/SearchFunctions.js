import axios from "axios"
import { baseUrl } from "../../Shared/baseUrl";

/** holds functions for all backend calls */

export async function searchRestaurantsByLocation(input) {

    const uri = baseUrl+"/search/location/"+input.replaceAll(" ", "+");

    const restaurantsResults = await axios.get(decodeURIComponent(uri)).catch(err => console.log(err))
    
    let restaurantsArray = restaurantsResults.data.businesses

    return(restaurantsArray)
}

export async function getRestaurantById(restaurantId) {

    const restaurant = await axios.get(baseUrl+"/search/restaurant/" + restaurantId).catch(err => console.log(err))

    return restaurant.data
}

export async function getEventsByUserId(userId) {

    const events = await axios.get(baseUrl+"/event/user/"+userId).catch(err => console.log(err))

    return events.data

}

export async function getEventByEventId(eventId) {
    const event = await axios.get(baseUrl+"/event/"+eventId).catch(err => console.log(err))

    return event.data
}

export async function getGuestByEventIdAndGuestId(eventId, guestId) {
    const guest = await axios.get(baseUrl+"/event/"+eventId+"/guests/"+guestId).catch(err => console.log(err))

    return guest.data
}

export async function getFavoritesByUserId(userId) {

    const favorites = await axios.get(baseUrl + '/user/id/' + userId + '/favorite').catch(err => console.log(err))

    return favorites.data
}