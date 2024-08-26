import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Count from "../firebase/count";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const [size, setSize] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const size = async () => {
      const value = await Count();
      setSize(value);
    };
    size();
  }, []);
  return (
    <>
      <div className="h-screen w-screen bg-gray-950 flex items-center justify-center flex-col gap-10">
        <div className="">
          <h2 className="text-2xl font-[Roboto] text-gray-500">
            Number Of Records:
            <input
              type="number"
              value={size}
              disabled
              className="rounded py-2 px-5 ml-3"
            />
          </h2>
        </div>
        <div className="flex gap-8">
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-xl text-xl"
            onClick={() => {
              navigate("/Myform");
            }}
          >
            Create
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-xl text-xl"
            onClick={() => {
              navigate("/viewpage");
            }}
          >
            View
          </button>
        </div>
      </div>
    </>
  );
}
export default Homepage;
