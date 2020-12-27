import React, { Component } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import JournalControl from "./JournalControl";
import Modal from "react-modal";
import { v4, validate as uuidValidate } from "uuid";

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
    currentlySelectedJournal: this.props.currentUser.journals[0],
    isNewJournalModalVisible: false,
    stateJournals: [],
  };

  handleRequestToCreateJournal = () => {
    this.setState({ isNewJournalModalVisible: true });
  };

  handleChangeCurrentlyJournal = (id) => {
    let newCurrentJournal;
    if (uuidValidate(id)) {
      newCurrentJournal = this.state.stateJournals.filter(
        (journal) => journal.id == id
      )[0];
    } else {
      newCurrentJournal = this.props.currentUser.journals.filter(
        (journal) => journal.id == id
      )[0];
    }
    this.setState({
      currentlySelectedJournal: newCurrentJournal,
    });
  };

  handleCreateJournal = (event) => {
    // event.preventDefault();
    const newJournalID = v4();
    const newJournal = {
      id: newJournalID,
      name: event.target.name.value,
      notes: [],
    };
    const newStateJournalsList = [...this.state.stateJournals, newJournal];
    this.setState({
      stateJournals: newStateJournalsList,
      isNewJournalModalVisible: false,
      currentlySelectedJournal: newJournal,
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
                journals={this.props.currentUser.journals}
                currentlySelectedJournal={this.state.currentlySelectedJournal}
                stateJournals={this.state.stateJournals}
                onClickOfNewJournalBtn={this.handleRequestToCreateJournal}
                onChangeCurrentJournal={this.handleChangeCurrentlyJournal}
              />
            </div>
            <div className="col-10 bg-light">
              <JournalControl
                currentJournal={this.state.currentlySelectedJournal}
              />
            </div>
          </div>
        </div>
        {modal}
      </React.Fragment>
    );
  }
}

export default JournalRecorder;
