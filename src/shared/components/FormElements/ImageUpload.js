import React, { useRef } from "react";

import Button from "./Button";

import "./ImageUpload.css";

const ImageUpload = (props) => {
  const filePickerRef = useRef();

  const handlePicked = (event) => {
    console.log(event.target);
  };

  const handlePickImage = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        type="file"
        style={{ display: "none" }}
        accept=".jpg,.png,.jpeg,.svg"
        onChange={handlePicked}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          <img src="" alt="preview" />
        </div>
        <Button type="button" onClick={handlePickImage}>
          Pick Image
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
