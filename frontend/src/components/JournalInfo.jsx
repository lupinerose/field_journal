import React from 'react';
import PropTypes from 'prop-types';
import EntryList from './EntryList';
import { v4 } from 'uuid';
import Moment from 'moment';
import { Redirect } from 'react-router-dom';

function JournalDetails(props) {
  let _entry = null;

  function addNewEntry(event) {
    event.preventDefault();
    props.onAddingNewEntry({ name: _entry.value, id: v4(), journalId: props.journalList[props.currentJournal].journalId, dateTimeString: new Moment() });
    _entry.value = '';
  }

  function deleteJournal() {
    props.onDeletingJournal(props.currentJournal);
  }

  var btnParent = {
    textAlign: 'center',
    marginTop: '20px'
  };
  var btnStyle = {
    backgroundColor: '#0f2c3e',
  };
  var headerStyle = {
    textAlign: 'center',
    color: '#0f2c3e'
  };

  if (props.currentJournal) {
    let journal = props.journalList[props.currentJournal];
    return (
      <div>
        <h1 style={headerStyle}>{journal.name}</h1>
        <EntryList entryList={journal.entries} />
        <form onSubmit={addNewEntry}>
          <style jsx>{`
            .input-field input[type=text]:focus {
              border-bottom: 1px solid #0f2c3e;
              box-shadow: 0 1px 0 0 #0f2c3e;
            }
        `}</style>
          <div className='input-field'>
            <input
              id='entry'
              type='text'
              placeholder='Add a new entry'
              ref={(input) => { _entry = input; }} />
          </div>
          <div style={btnParent}>
            <button type='submit' style={btnStyle} className="waves-effect waves-light btn-small"><i className="material-icons left">edit</i>Add Entry</button>
          </div>
        </form>
        <div style={btnParent}>
          <button style={btnStyle} className="btn-small waves-effect waves-light" onClick={deleteJournal}><i className="material-icons left">delete</i>Delete This Journal</button>
        </div>
      </div>
    );
  } else {
    return (
      <Redirect to='/' />
    );
  }
}

JournalDetails.propTypes = {
  journalList: PropTypes.object,
  currentJournal: PropTypes.string,
  onAddingNewEntry: PropTypes.func,
  onDeletingJournal: PropTypes.func
};

export default JournalDetails;