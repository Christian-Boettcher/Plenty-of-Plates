import React from 'react'
import {useSelector} from 'react-redux'
import { UncontrolledTooltip } from 'reactstrap';
import './GuestLink.css'

export default function GuestLink({guestName, guestId, guestEmail, eventId}) {

  /** brings username from redux state */
  const username = useSelector((state) => state.user.username)

  return (
    <div className="event--confirmed-guest">
      <label className='guest--name-label'>{guestName}</label>
      {/** text box and button to copy unique guest link */}
      <input className="guest--name-input" id="input--eventLink" type='text' readOnly={true} value={`localhost:3000/vote/${eventId}/${guestId}`} />
      <button id="copyBtn" className='copyBtn' onClick={() => navigator.clipboard.writeText(`localhost:3000/vote/${eventId}/${guestId}`)}>
        <i className='fa fa-clone'/>
      </button>
      {/** tooltip displays when copy button is clicked */}
      <UncontrolledTooltip target="copyBtn" trigger="click" autohide={true} placement='top'>Copied!</UncontrolledTooltip>
      {/** if e-mail exists, button opens e-mail client with guest e-mail address and template e-mail */}
      {guestEmail === "" ? <></> : guestEmail === undefined ? <></> : 
      <a className="emailLink" href={`mailto:${guestEmail}?&subject=${username} has invited you out!&body=Click this link localhost:3000/vote/${eventId}/${guestId}`} target="_blank" rel="noreferrer">
      <button className='emailBtn'>
      <div className="svg-wrapper-1">
        <div className="svg-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
          </svg>
        </div>
      </div>
        <span>
          E-mail Link
        </span>
      </button>
    </a>}
    </div>)
};