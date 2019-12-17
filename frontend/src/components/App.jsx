import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { v4 } from 'uuid';
import Navbar from './Navbar';
import JournalList from './JournalList';
import NewJournalForm from './NewJournalForm';
import JournalInfo from './JournalInfo';
import LoginPage from './LoginPage';
import CreateAcctPage from './CreateAcctPage';
import { cloneDeep } from 'lodash';
import BackendHelper from '../BackendHelper.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: 0,
            currentJournal: null,
            masterJournalList: {},
            token: null
        };

        this.backendHelper = new BackendHelper();
        this.handleLogout.bind(this);
        this.handleAddingNewJournal = this.handleAddingNewJournal.bind(this);
        this.handleSettingCurrentJournal = this.handleSettingCurrentJournal.bind(this);
        this.handleAddingNewEntry = this.handleAddingNewEntry.bind(this);
        this.handleDeletingJournal = this.handleDeletingJournal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleCreateAcct = this.handleCreateAcct.bind(this);
    }

    handleCreateAcct(newUser) {
        this.backendHelper.backendPostNewUser(newUser);
    }

    handleLogin(user) {
        let loginPromise = this.backendHelper.backendAttemptLogin(user);
        loginPromise.then((response) => {
            let parsedResponse = JSON.parse(response);
            console.log('JSON RESPONSE (handleLogin): ', parsedResponse);
            this.setState({ currentUser: parsedResponse.UserId });
            this.setState({ token: parsedResponse.token });
        }).then(() => { this.getJournalList() });
    }
    getJournalList() {
        let dataPromise = this.apiHelper.backendGetUserJournals(this.state.token);
        dataPromise.then((response) => {
            let parsedResponse = JSON.parse(response);
            console.log('JSON RESPONSE (getJournalList): ', parsedResponse);
            for (let i = 0; i < parsedResponse.length; i++) {
                this.handleAddingJournalToState(parsedResponse[i]);
            }
        });
    }

    handleAddingJournalToState(journal) {
        let journalId = v4();
        let newMasterJournalList = Object.assign({}, this.state.masterJournalList, {
            [journalId]: journal
        });
        this.setState({ masterJournalList: newMasterJournalList });
    }

    handleAddingNewJournal(newJournal) {
        let addJournalPromise = this.backendHelper.backendPostNewJournal(newJournal, this.state.token);
        addJournalPromise.then((response) => {
            newJournal.journalId = JSON.parse(response);
            let newJournalId = v4();
            let newMasterJournalList = Object.assign({}, this.state.masterJournalList, {
                [newJournalId]: newJournal
            });
            this.setState({ masterJournalList: newMasterJournalList });
        });
    }

    handleAddingNewEntry(newEntry) {
        console.log('NEW ENTRY TO ADD: ', newEntry);
        let addEntryPromise = this.backendHelper.backendPostNewEntry(newEntry, this.state.token);
        addEntryPromise.then(() => {
            const copyMasterJournalList = cloneDeep(this.state.masterJournalList); //use lodash to make a deep copy
            copyMasterJournalList[this.state.currentJournal].entries.push(newEntry);
            this.setState({ masterJournalList: copyMasterJournalList });
        });
    }

    handleSettingCurrentJournal(journalId) {
        this.setState({ currentJournal: journalId });
    }

    handleDeletingJournal() {
        let copyMasterJournalList = cloneDeep(this.state.masterJournalList); //use lodash to make a deep copy
        delete copyMasterJournalList[this.state.currentJournal];
        this.setState({ masterJournalList: copyMasterJournalList });
        this.setState({ currentJournal: null });
    }

    handleLogout() {
        this.setState({ currentUser: 0 });
        this.setState({ currentJournal: null });
        this.setState({ masterJournalList: {} });
        this.setState({ token: null });
    }
    render() {
        console.log('APP STATE: ', this.state);
        return (
            <div>
                <Navbar
                    onLogout={this.handleLogout}
                    currentUser={this.state.currentUser} />

                <div className="container">
                    <Switch>
                        <Route exact path='/' render={() => <JournalList
                            journalList={this.state.masterJournalList}
                            onSettingCurrentJournal={this.handleSettingCurrentJournal} />} />

                        <Route path='/create' render={() => <NewJournalForm
                            onNewJournalCreation={this.handleAddingNewJournal}
                            currentUser={this.state.currentUser} />} />

                        <Route path='/info' render={() => <JournalInfo
                            currentJournal={this.state.currentJournal}
                            journalList={this.state.masterJournalList}
                            onAddingNewEntry={this.handleAddingNewEntry}
                            onDeletingJournal={this.handleDeletingJournal} />} />

                        <Route path='/create-account' render={() => <CreateAcctPage
                            onCreateAcct={this.handleCreateAcct} />} />
                        <Route path='/sign-in' render={() => <LoginPage
                            onLogin={this.handleLogin} />} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;