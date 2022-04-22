import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentShoe,
  updateShoe,
} from "../../features/modelsListSlice";
import { addShoe, removeShoe, selectShoeList } from "../../features/shoeListSlice";
import Dialog from "./Dialog";

const BagShoeControls = ({ shoe, handleDone }) => {
  const bag = useSelector(selectShoeList);
  const currentModel = useSelector(selectCurrentShoe);
  const dispatch = useDispatch();

  const handleEdit = () => {
    const currentShoe = bag.find((elem) => elem.index === currentModel.index);
    if (currentShoe) {
      dispatch(addShoe({ ...currentShoe, editing: false }));
    }
    dispatch(updateShoe({ ...shoe, editing: !shoe.editing}));
    dispatch(addShoe({ ...shoe, editing: !shoe.editing}));
  };

  const handleEditConfirm = () => {
    handleDone();
    dispatch(updateShoe({ ...shoe, editing: !shoe.editing}));
    dispatch(addShoe({ ...shoe, editing: !shoe.editing}));
  };

  const handleCopy = () => {
    dispatch(updateShoe({ ...currentModel, meshes: shoe.meshes }));
  };

  const handleSave = () => {
    handleDone();
  };

  const handleDiscard = () => {
    dispatch(updateShoe({ ...shoe, editing: false}));
    dispatch(addShoe({ ...shoe, editing: false}));
  };

  const handleRemove = () => {
    setTimeout(() => {
      dispatch(removeShoe(shoe));
    });
  };

  return (
    <div className="bag-shoe-info2">
      <div className="bag-shoe-control">
        {shoe.editing ? (
          <>
            <p className="bag-shoe-control" onClick={() => handleSave()}>
              Save
            </p>
            <p className="bag-shoe-control" onClick={() => handleDiscard()}>
              Discard
            </p>
          </>
        ) : (
          <>
            <Dialog
              className="bag-shoe-control"
              name={"Edit"}
              actionDefault={() => handleEdit()}
              actionConfirm={() => handleEditConfirm()}
            />
            <p className="bag-shoe-control" onClick={() => handleCopy()}>
              Copy
            </p>
          </>
        )}
      </div>
      <p className="bag-shoe-control" onClick={() => handleRemove()}>
        Remove
      </p>
    </div>
  );
};

export default BagShoeControls;
