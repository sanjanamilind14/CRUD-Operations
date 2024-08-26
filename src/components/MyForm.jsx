import React, { useEffect, useState } from "react";
import Qualification from "./Qualification";
import Image from "./Image";
import { Link, useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import writeData from "../firebase/writeData";
import updateData from "../firebase/updateData";

const MyForm = () => {
  const { id } = useParams();
  const nanoID = nanoid();
  const [update, setUpdate] = useState({
    image: false,
    resume: false,
  });

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    dob: "",
  });
  const [qual, setqual] = useState([]);
  const [image, setImage] = useState("/upload-icon-22.png");
  const [resume, setResume] = useState(null);
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
            dob: record.dob || "",
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
    setUpdate((prevData) => ({
      ...prevData,
      resume: true,
    }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setUpdate((prevData) => ({
      ...prevData,
      image: true,
    }));
  };

  const handleSubmit = (e) => {
    // prevents the browser's default form submission behavior, which could cause a page reload.
    e.preventDefault();
    console.log("Form submitted with data:", formData);
  };

  return (
    <div className="h-screen w-screen bg-gray-950 text-white flex flex-col items-center pt-10 font-[Roboto] gap-4">
      <h1 className="text-3xl">Create Record</h1>
      <form className="flex flex-col gap-y-4 w-full items-center text-xl">
        <div className="flex gap-4 justify-center items-center">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="rounded-lg px-4 py-2 bg-gray-700"
          />
        </div>
        <div className="flex gap-4 justify-center items-center">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="rounded-lg px-4 py-2 bg-gray-700"
          />
        </div>
        <div className="flex gap-4 justify-center items-center">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="rounded-lg px-4 py-2 bg-gray-700"
          />
        </div>
        <div className="flex gap-4 justify-center items-center">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="rounded-lg px-4 py-2 bg-gray-700"
          />
        </div>
        <div className="flex gap-4 justify-center items-center">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            className="rounded-lg px-4 py-2 bg-gray-700"
          />
        </div>
        <Qualification qual={qual} setQual={setqual} />
        <div className="flex gap-4 justify-center items-center">
          <label className="rounded-lg px-4 py-2 bg-gray-700" htmlFor="resume">
            Upload Your Resume
          </label>
          <input
            type="file"
            id="resume"
            accept="application/pdf"
            className="rounded-lg px-4 py-2 bg-gray-700 hidden"
            onChange={handleResumeChange}
          />
        </div>

        <label className="rounded-lg px-4 py-2 bg-gray-700" htmlFor="image">
          Upload Your Picture
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          className="rounded-lg px-4 py-2 bg-gray-700 hidden"
        />
        {/* <Image image={image} setImage={setImage}/> */}
        <div className="flex gap-4">
          <input
            type="button"
            value="SUBMIT"
            id="submit"
            onClick={() =>
              writeData(id || nanoID, formData, qual, image, resume, update)
            }
            className="rounded-lg px-4 py-2 bg-gray-700"
          />
          <button
            onClick={() => {
              setFormData({
                name: "",
                phone: "",
                email: "",
                address: "",
                dob: "",
              });
              setqual([]);
              setImage("/upload-icon-22.png");
              setResume(null);
            }}
            className="border border-gray-500 py-2 px-4 rounded-lg"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyForm;
