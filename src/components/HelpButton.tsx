import { FC, useState } from "react";
import { FaInfoCircle } from 'react-icons/fa';
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

interface Props {
  numPages: number
  numLanguages: number
}

const HelpButton:FC<Props> = ({ numPages, numLanguages }) => {
  const [showPopup, setShowPopup] = useState(false);

  const getMessage = () => {
    if (numPages !== 0) {
      return (
        <div>
          <h5>Please use this component to indicate the number pages your website will have.</h5>
        </div>
      );
    }

    if (numLanguages !== 0) {
      return (
        <div>
          <h5>Please use this component to indicate the number languages your website will be translated to.</h5>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <button className="popup-button" onClick={() => setShowPopup(true)}>
        <FaInfoCircle />
      </button>

      <Popup open={showPopup} onClose={() => setShowPopup(false)}>
        {getMessage()}
      </Popup>
    </>
  );
}
  
export default HelpButton;
