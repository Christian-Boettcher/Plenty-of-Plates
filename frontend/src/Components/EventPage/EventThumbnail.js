import React from 'react'
import { Link } from 'react-router-dom'
import './EventThumbnail.css'

function EventThumbnail({event}) {

  return (
    <div className="event-thumbnail--container">
        <Link className="results--thumbnail-link" to={{
          pathname: `/results/`,
          state: {savedEvent: event}
          }}>
          <button className='results--thumbnailBtn'>
            <h3>{event.title}</h3>
            <h5>{event.date}</h5>
          </button>
        </Link>
    </div>
  )
}

export default EventThumbnail