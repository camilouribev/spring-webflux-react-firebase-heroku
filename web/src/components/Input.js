import React, { useRef } from "react";
import JoditEditor from "jodit-react";

function Input({ setContent }) {
  const editor = useRef(null);

  const config = {
    readonly: false,
  };

  return (
    <JoditEditor
      ref={editor}
      config={config}
      tabIndex={1} // tabIndex of textarea
      onBlur={(newContent) => setContent(newContent)} // update the content for performance reasons
    />
  );
}

export default Input;
