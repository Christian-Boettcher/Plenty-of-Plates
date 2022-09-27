import React from 'react'

export default function RestaurantHours({object}) {
    let today;
    if (object.day === 6) {
        today = "Sunday"
    } else if (object.day === 0) {
        today = "Monday"
    } else if (object.day === 1) {
        today = "Tuesday"
    } else if (object.day === 2) {
        today = "Wednesday"
    } else if (object.day === 3) {
        today = "Thursday"
    } else if (object.day === 4) {
        today = "Friday"
    } else if (object.day === 5) {
        today = "Saturday"
    }

    return (
        <div className='hours--container'>
            <h4 className='hours--header'>{today}</h4>
            <p className='hours--data'>
                Open: {convertTime(object.start)}<br />
                Close: {convertTime(object.end)}<br />
            </p>
        </div>
    )
}

function convertTime(time) 
{
    let hourHand = time.substring(-1, 2);
    let minuteHand = time.substring(2, 4);
    let ampm = 'AM';
    if (parseInt(hourHand) >= 12) 
    { 
        ampm = 'PM' 
    }
    if (parseInt(hourHand) > 12) 
    {
        hourHand = parseInt(hourHand) - 12;
    }
    return String(hourHand).padStart(2,'0') + ':' + minuteHand + ' ' + ampm;
}