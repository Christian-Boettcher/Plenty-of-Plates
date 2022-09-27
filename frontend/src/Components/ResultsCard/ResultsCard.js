import React from 'react'
import "./ResultsCard.css"

export default function ResultsCard(props) {

    /** thumbnail version to show votes on restaurants selected for events */
    
    return (
        <div className="restaurant--thumbnail">
            <img className="restaurant--thumbnail-image" src={props.restaurant.image_url} alt="small thumbnail of restaurant"/>
            <><span className="result-eventCreated-text">{props.restaurant.name}</span></>
            <div className="upvotes">
                {props.restaurant.upVotes}
            </div>
            <div className="downvotes">
                {props.restaurant.downVotes}
            </div>
        </div>
      )
}