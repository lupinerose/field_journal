import React from 'react';
import PropTypes from 'prop-types';
import Entry from './Entry';

function EntryList(props) {
  return (
    <div>
      {props.entryList.map((thisEntry, index) =>
        <Entry
          site={thisEntry.site}
          key={index}
          dateTimeString={thisEntry.dateTimeString} />
      )}
    </div>
  );
}

EntryList.propTypes = {
  entryList: PropTypes.array
};

export default EntryList;
