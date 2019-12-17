import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Journal(props) {

  function seeJournalDetails() {
    let journalId = props.journalId;
    props.onSettingCurrentJournal(journalId);
  }

  var cardStyle = {
    backgroundColor: '#0f2c3e'
  };
  var journalBtnStyle = {
    backgroundColor: '#e3eff3',
    color: '#0f2c3e',
    marginTop: '15px'
  };
  var journalBtnParent = {
    textAlign: 'center'
  };

  return (
    <div>
      <div className="card darken-1" style={cardStyle}>
        <div className="card-content white-text">
          <span className="card-title">{props.name}</span>
          <div style={journalBtnParent}>
            <Link onClick={seeJournalDetails} to='/info' style={journalBtnStyle} className="btn-small waves-effect waves-light"><i className="material-icons left">Journal</i>Journal Info</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

Journal.propTypes = {
  name: PropTypes.string,
  entries: PropTypes.array,
  id: PropTypes.string,
  onSettingCurrentJournal: PropTypes.func,
  journalId: PropTypes.string
};

export default Journal;