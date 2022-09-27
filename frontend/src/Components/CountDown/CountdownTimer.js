import React from 'react';
import DateTimeDisplay from './DateTimeDisplay';
import useCountdown from './useCountdown';
import "./CountDown.css";
import {Link} from 'react-router-dom'
import { Button } from 'reactstrap'

/** show when deadline has passed */
const ExpiredNotice = ({isGuest}) => {
  return (
    <div className="expired-notice">
      {isGuest ? <span>Oh no, it's too late!</span> : <></>}
      <p>The voting deadline has passed! Eat well and prosper!</p>
      {isGuest ? <Link to='/home'><Button>Home</Button></Link> : <></>}
    </div>
  );
};

/** counts down until deadline */
const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="show-counter">
       <div>You have</div>        <div className='show-counter-timer'><DateTimeDisplay value={days} type={'Days'} isDanger={false} />  :  </div>       <div className='show-counter-timer'><DateTimeDisplay value={hours} type={'Hours'} isDanger={false} /> : </div>       <div className='show-counter-timer'><DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} /> : </div>       <div className='show-counter-timer'><DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} /></div>        <div>to just pick a place!</div> <br />
    </div>
  );
};

const CountdownTimer = (props) => {

  /** takes deadline as a parameter, separates parts */
  const time = props.targetdate;

  let year = parseInt(time.substring(0,4));
  let month = parseInt(time.substring(5,7));
  let processedMonth = month -1;
  let day = parseInt(time.substring(8));
  let hour = 24;

  let finalDate = new Date(year,processedMonth,day,hour,);

  /** send parts to do math */
  const [days, hours, minutes, seconds] = useCountdown(finalDate);
  
  if (days + hours + minutes + seconds <= 0) {

    props.handleExpired(true);

    return <ExpiredNotice isGuest={props.isGuest}/>;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        isGuest={props.isGuest}
      />
    );
  }
};

export default CountdownTimer;