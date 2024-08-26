import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import Count from "../firebase/count";

function Homepage(){
const [size, setSize] = useState(0);

  useEffect(() => {
    const size = async () => {
      const value = await Count();
      setSize(value);
    };
    size();
  }, []);
    return(
        <>
        <h2 className="num">Number Of Records: <input type="number" value={size} disabled/></h2>
        <button className="create"><Link to = "/Myform">Create Record</Link></button>
        <button className="view"><Link to = "/viewpage">View Record</Link></button>
        </>

    )
}
export default Homepage