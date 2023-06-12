import React, {useState, useEffect} from 'react';
import{Link, useNavigate} from "react-router-dom";
import "./Home.css";
import{toast} from "react-toastify";
import axios from "axios";
import { FaRegEye, FaTrashAlt, FaPencilAlt} from "react-icons/fa";


export const Home = () => {
const[data, setData] = useState([]);

const navigate = useNavigate();

const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/get");
    setData(response.data); 
};

useEffect(() =>{ 
    loadData();
}, []);

const deleteTask = (id) => {
    if(window.confirm("Are you sure you wanted to delete that task?")){
        axios.delete(`http://localhost:5000/api/remove/${id}`);
        toast.success("task deleted Successfully!");
        setTimeout(() => {navigate("/"); loadData() }, 500)
    }
}

  return (
    <div className="demo">
    <div style={{marginTop: "150px"}}>
        <Link to="/addTask" >
        <button className="btn btn-task" style={{marginBottom: "20px"}}>Add Task</button>
        </Link>
      <div >
        <table className="styled-table" >
            <thead style={{display:'table'}}>
                <tr className="header">
                   <th style={{textAlign:"center" }}>No.</th>
                   <th style={{textAlign:"center" }}>Task</th>
                   <th style={{textAlign:"center" }}>Discription</th>
                   <th style={{textAlign:"center" }}>Action</th>
                </tr>
            </thead>
           
            <tbody style={{display:"block"}}>
                {data.map((item, index) => {
                    return(
                        <tr key={item.id}>
                            <th scope="row">{index+1}</th>
                            <td>{item.task}</td>
                            <td>{item.discription}</td>
                            <td>
                                <Link to={`/view/${item.id}`}>
                                <button className="btn btn-edit"><FaRegEye/> </button>
                                </Link>
                                <Link to={`/delete/${item.id}`}>
                                <button className="btn btn-delete" onClick={() => deleteTask(item.id)}><FaTrashAlt/></button>
                                </Link>
                                <Link to={`/update/${item.id}`}>
                                <button className="btn btn-view"><FaPencilAlt/></button>
                                </Link>
                            </td>
                        </tr>
                       
                    )
                })}
             </tbody>
        </table>
    </div>   
   </div>
 </div>
    
  )
}
