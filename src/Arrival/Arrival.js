import React from 'react';
import './Arrival.css';
import moment from 'moment';
import Timeliness from '../Timeliness/Timeliness'
import RouteIcon from '../RouteIcon/RouteIcon'

export default function Arrival(props) {
  const { arrival, setClickedTrip, setHoverTrip, lastUpdated } = props;
  return (
    <div
      className="Arrival"
      onClick={ () => { setClickedTrip(arrival)} }
      onMouseEnter={ () => {setHoverTrip(arrival)} }
    >
      <RouteIcon arrival={ arrival } />
      <div className="details">
        <h4>{ arrival.tripHeadsign }</h4>
        <h5>
          <Timeliness arrival={ arrival } />
        </h5>
      </div>
      <MinutesUntil arrival={ arrival } lastUpdated={ lastUpdated } />
    </div>
  )
}

function MinutesUntil(props) {
  const { arrival, lastUpdated } = props;
  const { predictedDepartureTime, scheduledDepartureTime } = arrival
  const predicted = predictedDepartureTime !== 0 ? '' : '*'
  const minuteDiff = Math.round(moment(predictedDepartureTime || scheduledDepartureTime ).diff(lastUpdated) / 60000);

  return (
    <div className="minutesUntil">
      { minuteDiff ? minuteDiff + predicted : 'NOW' }
      { minuteDiff ? <div>MINUTES</div> : null }
    </div>
  );
}
