import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

function Entry(props) {

  let written = moment(props.dateTimeString).calendar();

  return (
    <div>
      <p>{props.site} <em>(Site: {written})</em></p>
      <p>Temperature: {props.temperature}°C</p>
      <p>Weather Condition: {props.weather}</p>
      <p>Wind Condition: {props.wind}</p>
      <p>Soil/Water Condition: {props.soil}</p>
      <p>Observation: {props.observation}</p>
    </div>
  );
}

Entry.propTypes = {
  site: PropTypes.string,
  temperature: PropTypes.number,
  weather: PropTypes.string,
  wind: PropTypes.string,
  soil: PropTypes.string,
  observation: PropTypes.string,
  dateTimeString: PropTypes.object
};

export default Entry;
