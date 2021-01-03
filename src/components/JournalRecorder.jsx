import React, { Component } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import JournalControl from "./JournalControl";
import Modal from "react-modal";
import { v4, validate as uuidValidate } from "uuid";
import { connect } from "react-redux";
import * as a from "../actions";

var fp = require("lodash/fp");
Modal.setAppElement("#root");
const createJournalBtnStyles = { border: "3px solid #5A2762" };

const modalStyles = {
  content: {
    width: "50vw",
    height: "50vh",
    right: "auto",
    bottom: "auto",
    // marginRight: "-50%",
    transform: "translate(50%, 50%)",
  },
};

class JournalRecorder extends Component {
  state = {
    isNewJournalModalVisible: false,
  };

  handleRequestToCreateJournal = () => {
    this.setState({ isNewJournalModalVisible: true });
  };

  handleChangeCurrentJournal = (id) => {
    const { dispatch } = this.props;
    const newSelectedJournalId = Object.keys(this.props.journals).find(
      (journalId) => journalId === id
    );
    const changeJournalAction = a.changeJournal(
      this.props.journals[newSelectedJournalId]
    );
    dispatch(changeJournalAction);
  };

  handleCreateJournal = (event) => {
    // event.preventDefault();
    const { dispatch } = this.props;
    const newJournalId = v4();
    const newJournal = {
      id: newJournalId,
      name: event.target.name.value,
      notes: [],
    };
    const newJournalAction = a.addJournal(newJournal);
    dispatch(newJournalAction);
    const changeJournalAction = a.changeJournal(newJournal);
    dispatch(changeJournalAction);
    this.setState({
      isNewJournalModalVisible: false,
    });
  };

  render() {
    let modal = null;
    if (this.state.isNewJournalModalVisible) {
      modal = (
        <Modal isOpen={this.state.isNewJournalModalVisible} style={modalStyles}>
          <h2>Create a Journal</h2>
          <form onSubmit={this.handleCreateJournal}>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="newJournalName"
                placeholder="Enter Journal Name"
                name="name"
              />
              <label htmlFor="newJournalName">Enter Journal Name</label>
            </div>
            <button
              type="submit"
              className="btn mt-3"
              style={createJournalBtnStyles}
            >
              Create Journal
            </button>
          </form>
        </Modal>
      );
    }
    return (
      <React.Fragment>
        <div className="container-fluid px-0 h-100">
          <Header userFirstName={this.props.currentUser.firstName} />
          <div className="row h-100">
            <div className="col-2 pe-0">
              <SideBar
                currentlySelectedJournal={this.props.selectedJournal}
                stateJournals={this.props.journals}
                onClickOfNewJournalBtn={this.handleRequestToCreateJournal}
                onChangeCurrentJournal={this.handleChangeCurrentJournal}
              />
            </div>
            <div className="col-10 bg-light">
              <JournalControl currentJournal={this.props.selectedJournal} />
            </div>
          </div>
        </div>
        {modal}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    journals: state.journals,
    selectedJournal: state.selectedJournal,
  };
};

JournalRecorder = connect(mapStateToProps)(JournalRecorder);

export default JournalRecorder;
