import React, { useEffect, useState } from 'react';
import Qualification from './Qualification';
import Image from './Image';
import { Link, useParams } from "react-router-dom";
import { nanoid } from "nanoid"
import writeData from '../firebase/writeData';
import updateData from '../firebase/updateData';

const MyForm = () => {
  const { id } = useParams();
  const nanoID = nanoid();
  const [update, setUpdate] = useState({
    image:false,
    resume:false
  })

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    dob: '',
  });
  const [qual, setqual] = useState([])
  const [image, setImage] = useState("/upload-icon-22.png");
  const [resume, setResume] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // retrieves data related to the provided id.
        const record = await updateData(id);
        if (record !== null) {
          setFormData({
            name: record.name || "",
            phone: record.phone || "",
            email: record.email || "",
            address: record.address || "",
            dob: record.dob || ''
          });
          setqual(record.qualification || []);
          setImage(record.image || "/upload-icon-22.png");
          setResume(record.resume || null);
        } else {
          window.location.href = "/";
        }
      } catch (error) {
        console.error("Error fetching record:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    setResume(file);
    setUpdate(prevData=>({
      ...prevData,
      resume:true
    }))
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setUpdate(prevData=>({
      ...prevData,
      image:true
    }))
  };

  const handleSubmit = (e) => {
    // prevents the browser's default form submission behavior, which could cause a page reload.
    e.preventDefault();
    console.log('Form submitted with data:', formData);
  };

  return (
    <div>
      <h1>Create Record</h1>
      <form>
        <label>
          Name:
          <br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Address:
          <br />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Phone:
          <br />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Email:
          <br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Date of Birth:
          <br />
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label className="resume">
          Upload Your Resume: <br />

        </label>
        <input type="file" id="resume" accept="application/pdf" onChange={handleResumeChange} />
        <br />
        <Qualification qual={qual} setQual={setqual} />

        <br />
        <label className="image">
          Upload Your Picture: <br />

        </label>
        <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
        {/* <Image image={image} setImage={setImage}/> */}
        <input type="button" value="SUBMIT" id="submit" onClick={() => (writeData(id || nanoID, formData, qual, image, resume, update))} />
        <input type="button" value="DELETE" id="delete" />
      </form>
    </div>
  );
};

export default MyForm;

