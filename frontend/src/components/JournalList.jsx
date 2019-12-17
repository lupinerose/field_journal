import React from 'react';
import Journal from './Journal';
import PropTypes from 'prop-types';

function JournalList(props) {
  if (Object.entries(props.journalList).length == 0) {
    var greyStyle = {
      color: '#6e828a',
      textAlign: 'center'
    };
    return (
      <div>
        <h3 style={greyStyle}>There are no journals at this time</h3>
      </div>
    );
  } else {
    return (
      <div>
        {Object.keys(props.journalList).map((journalId) => {
          var journal = props.journalList[journalId];
          return <Journal name={journal.name}
            key={journalId}
            journalId={journalId}
            onSettingCurrentJournal={props.onSettingCurrentJournal}
            entries={journal.entries}
          />;
        })}
      </div>
    );
  }
}

JournalList.propTypes = {
  JournalList: PropTypes.object,
  onSettingCurrentJournal: PropTypes.func
};

export default JournalList;