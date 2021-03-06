import { MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectcolorsList } from "../features/colorsListSlice";
import {
  activeContextMenu,
  changeColor,
  changeMousePosition,
} from "../features/contextMenuSlice";

const ColorsSaved = ({
  classParent,
  classChild,
  action,
}: {
  classParent: string;
  classChild: string;
  action: Function;
}) => {
  const colorsList = useSelector(selectcolorsList);
  const dispatch = useDispatch();

  const openContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(activeContextMenu());
    dispatch(changeMousePosition([e.clientX, e.clientY]));
    dispatch(changeColor(""));
  };

  const handleRemove = (e: MouseEvent, color: string) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(activeContextMenu());
    dispatch(changeMousePosition([e.clientX, e.clientY]));
    dispatch(changeColor(color));
  };

  return (
    <div className={classParent} onContextMenu={(e) => openContextMenu(e)}>
      {colorsList.map((color: string, index: number) => {
        return (
          <div
            key={index}
            onClick={() => action(color)}
            onContextMenu={(e) => handleRemove(e, color)}
            style={{ backgroundColor: color }}
            className={classChild}
          />
        );
      })}
    </div>
  );
};

export default ColorsSaved;
