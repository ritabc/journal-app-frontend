import React from "react";
import { Trash } from "react-bootstrap-icons";
const DeleteButton = (props) => {
  function handleDeleteBtnClick() {
    props.onClickOfDeleteBtn({
      entityId: props.idOfEntityToEdit,
    });
  }
  return (
    <React.Fragment>
      <div className="delete-btn">
        <button
          className="btn btn-danger btn-sm"
          onClick={handleDeleteBtnClick}
        >
          <Trash size={15} />
        </button>
      </div>
    </React.Fragment>
  );
};

export default DeleteButton;
