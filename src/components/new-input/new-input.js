import "./new-input.css";
import { useRef, useEffect } from "react";

function NewInput(props) {
  const { onChangeAdd, onBlurAdd, btnState } = props;
  const inputElement = useRef(null);

  useEffect(() => {
    inputElement.current.focus();
  });

  return (
    <div className="new-item__input">
      <input
        className={
          btnState === "default"
            ? "new-item__input_hidden"
            : "new-item__input_visible"
        }
        ref={inputElement}
        defaultValue=""
        type={btnState === "default" ? "hidden" : "text"}
        onChange={onChangeAdd}
        onBlur={onBlurAdd}
      />
    </div>
  );
}

export default NewInput;
