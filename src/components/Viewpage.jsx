import React, { useEffect, useState } from "react";
import listData from "../firebase/listData";
import { useNavigate } from "react-router-dom";

const Table = () => {
  //  used for navigation within the application.
  const navigate = useNavigate();
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recordsElements = await listData({onCreateClick: handleClick,
        });
        setData(recordsElements);
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };
    fetchData();
  }, [navigate,data]);

    const handleClick = (id) => {
      navigate(`/Myform/${id}`);
    };

  return (
    <div className='viewpage'>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Image</th>
            <th>Resume</th>
            <th>options</th>
          </tr>
        </thead>
        <tbody>
          {data}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
