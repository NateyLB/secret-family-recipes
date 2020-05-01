import React, { useState } from "react";
import axios from "axios";

const ImageUpload = props => {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Choose File");
  const [uploadedFile, setUploadedfile] = useState({});
  const onChange = e => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", file);
    try {
      const res = await axios.put(
        "https://secret-family-recipes-bw.herokuapp.com/api/recipes/3/image",
        formData,
        {
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoiYW5nZWxhIiwiaWF0IjoxNTg4MjAxMzQzLCJleHAiOjE1ODg0NDEzNDN9.DSJzw_hmhTMR65x-EogYkfMDuzKerQrrQyirVDO1CN4",
            "Content-Type": "multipart/form-data"
          }
        }
      );
      const { fileName, filePath } = res.data;
      setUploadedfile({ fileName, filePath });
    } catch (err) {
      err.response.status === 500
        ? console.log("problem with the server")
        : console.log(err.res.data);
    }
  };
  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <label htmlFor="customerfile">
          {fileName}
          <input type="file" id="customfile" onChange={onChange} />
        </label>
        <input type="submit" value="Upload" />
      </form>
    </div>
  );
}

export default ImageUpload;