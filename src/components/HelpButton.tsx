import { FC, useState } from "react";
import { FaInfoCircle } from 'react-icons/fa';
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

interface Props {
  pagesPopup: boolean
  languagesPopup: boolean
}

const HelpButton:FC<Props> = ({ pagesPopup, languagesPopup }) => {
  const [showPopup, setShowPopup] = useState(false);

  const getMessage = () => {
    if (pagesPopup === true) {
      return (
        <div>
          <h5>Please use this component to indicate the number of pages your website will have.</h5>
        </div>
      );
    }

    if (languagesPopup === true) {
      return (
        <div>
          <h5>Please use this component to indicate the number of languages your website will be translated to.</h5>
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

      <Popup className="helpPopup" open={showPopup} onClose={() => setShowPopup(false)}>
        {getMessage()}
      </Popup>
    </>
  );
}
  
export default HelpButton;
