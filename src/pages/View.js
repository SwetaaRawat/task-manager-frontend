import React,{useState, useEffect} from 'react';
import { useParams,Link } from 'react-router-dom';
import axios from 'axios';
import "./View.css";

export const View = () => {
    const [task, setTask] = useState({});

    const{id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${id}`).then((resp) => setTask({...resp.data[0]}));
    }, [id])

  return (
    <div style={{marginTop: "150px"}}>
        <div className='card'>
            <div className='card-header'>
                <p>Task Details</p>
            </div>
            <div className='container'>
                <strong>ID: </strong>
                <span>{id}</span>
                <br/>
                <br/>
                <strong>Tack: </strong>
                <span>{task.task}</span>
                <br/>
                <br/>
                <strong>Discription: </strong>
                <span>{task.discription}</span>
                <br/>
                <br/>
                <Link to="/">
                <button className='btn btn-edit'>Go Back</button>
                </Link>
            </div>
        </div>
    </div>
  )
}
