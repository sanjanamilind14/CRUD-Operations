import React, { useRef } from "react";

const Image = ({ image, setImage }) => {
  // Create a reference to an input element
  const fileInputRef = useRef(null);

  const handleBoxClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    // Get the selected file from the input event
    const file = event.target.files[0];
    document.getElementById("image-box").src = URL.createObjectURL(file);
  };

  return (
    <div className="img" onClick={handleBoxClick}>
      <img src="/upload-icon-22.png" alt="" id="image-box"/>
      {/* {image === "./upload.png" } */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        required
      />
    </div>
  );
};

export default Image;