import React from "react";

const EditButton = (props) => {
  function handleEditBtnClick() {
    props.onClickOfEditBtn({
      entityId: props.idOfEntityToEdit,
    });
  }
  return (
    <React.Fragment>
      <div className="edit-btn px-0 mx-1 col-1">
        <button onClick={handleEditBtnClick}>E</button>
      </div>
    </React.Fragment>
  );
};

export default EditButton;
