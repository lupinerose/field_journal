import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

class NewJournalForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };

        this._name = null;
        this.handleAddingNewJournal = this.handleAddingNewJournal.bind(this);
    }
    handleAddingNewJournal(event) {
        event.preventDefault();
        this.props.onNewJournalCreation({ name: this._name.value, entries: [], UserId: this.props.currentUser });
        this._name.value = '';
        this.setState({ redirect: true });
    }

    render() {
        var btnParent = {
            textAlign: 'center',
            marginTop: '20px'
        };
        var btnStyle = {
            backgroundColor: '#747d5e',
            padding: '10px'
        };
        return (
            <div>
                {this.state.redirect ? <Redirect to='/' /> : ''}
                <form onSubmit={this.handleAddingNewJournal}>
                    <style jsx>
                        {`
                        .input-field input[type=text]:focus {
                            border-bottom: 1px solid #0f2c3e;
                            box-shadow: 0 1px 0 0 #0f2c3e;
                         }
                    `}</style>
                    <div style={btnParent} className='input-field'>
                        <input id='name'
                            type='text'
                            placeholder='Journal Name'
                            ref={(input) => { this._name = input; }} />
                    </div>
                    <div style={btnParent}>
                        <button type='submit' style={btnStyle} className="waves-light btn-large">Add Journal</button>
                    </div>
                </form>
            </div>
        );
    }
}
NewJournalForm.propTypes = {
    onNewJournalCreation: PropTypes.func,
    currentUser: PropTypes.number
};

export default NewJournalForm;