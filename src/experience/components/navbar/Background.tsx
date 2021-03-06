import { useState } from "react";
import "./background.scss";
import classNames from "classnames";
import BackgroundPicker from "./BackgroundPicker";

const Background = ({
  background,
  setBackground,
}: {
  background: string,
  setBackground: Function
}) => {
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [open, setOpen] = useState<Function>(() => {});

  const handlePicker = () => {
    if (!showPicker) {
      open();
    }
  };

  return (
    <div className="navbar background">
      <div className="background-button" onClick={handlePicker}>
        <div
          className="background-selected"
          style={{ backgroundColor: background }}
        />
        <svg
          className={classNames(
            "background-arrow",
            { active: showPicker },
            { disable: !showPicker }
          )}
          name="expand more"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
        >
          <path d="M14.15 16.6 24 26.5 33.85 16.65 36 18.8 24 30.75 12 18.75Z" />
        </svg>
      </div>
      <BackgroundPicker
        setOpen={setOpen}
        setShowPicker={setShowPicker}
        background={background}
        setBackground={setBackground}
      />
    </div>
  );
};

export default Background;
