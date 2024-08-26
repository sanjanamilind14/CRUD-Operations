import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { Link } from "react-router-dom";
import deleteData from "./deleteData";

async function listData({onCreateClick}) {
  const querySnapshot = await getDocs(collection(db, "records"));
  // console.log(querySnapshot);
  const recordElements = querySnapshot.docs.map((doc) => (
    <tr key={doc.id}>
      <td>{doc.data().name}</td>
      <td>{doc.data().phone}</td>
      <td>{doc.data().email}</td>
      <td>
        <button className="hover-even">
          <Link to={doc.data().image} target="_blank">
            {/* <img src={doc.data().image} alt="" /> */}
            view
          </Link>
        </button>
        {/* <img src={doc.data().image} alt="" className="hover-even" /> */}
      </td>
      <td>
        <button className="hover">
          <Link to={`${doc.data().resume}`} target="_blank">
            View
          </Link>
        </button>
      </td>
      <td>
        <button className="hover-even" onClick={() => onCreateClick(doc.id)}>
          Edit
        </button>
        <button className="hover" onClick={()=>deleteData(doc.id)}>
          Delete
        </button>
      </td>
    </tr>
  ));
  return recordElements;
}

export default listData;