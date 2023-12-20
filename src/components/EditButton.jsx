import React from "react";
import { Pencil } from "react-bootstrap-icons";

const EditButton = (props) => {
  function handleEditBtnClick() {
    props.onClickOfEditBtn({
      entityId: props.idOfEntityToEdit,
    });
  }
  return (
    <React.Fragment>
      <div className="edit-btn">
        <button className="btn btn-dark btn-sm" onClick={handleEditBtnClick}>
          <Pencil size={15} />
        </button>
      </div>
    </React.Fragment>
  );
};

export default EditButton;
