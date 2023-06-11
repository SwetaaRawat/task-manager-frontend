import React,{useState, useEffect} from 'react';
import {Link, useNavigate, useParams } from 'react-router-dom';
import "./AddEdit.css";
import axios from 'axios';
import { Toast, toast } from 'react-toastify';

const initialState = {
    task: "",
    discription: ""
};

export const AddEdit = () => {
    const [state, setState] = useState(initialState);
    const{task, discription} = state;
    const navigate =  useNavigate();
    const{id} = useParams();
    
    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${id}`).then((resp) => setState({...resp.data[0]}));
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!task || !discription){
            toast.error("Please provide value into each input field")
        }else{
            if(!id){
                axios.post("http://localhost:5000/api/post",{task, discription}).then(() => {
                setState({task: "", discription: ""})  
                 }).catch((err) => toast.error(err.response.data)); 
                 toast.success("Task Added Sucessfully!");
                 setTimeout(() => {navigate("/"); }, 500)
            }else{
                    axios.put(`http://localhost:5000/api/update/${id}`,{task, discription}).then(() => {
                     setState({task: "", discription: ""})  
                     }).catch((err) => toast.error(err.response.data)); 
                     toast.success("Task Updated Sucessfully!");
                   setTimeout(() => {navigate("/"); }, 500)
                }
           
        }
    };

    const handleInputChange = (e) => {
        const{name, value} = e.target;
        setState({...state, [name]: value});
    }

  return (
    <div style={{marginTop: "100px"}}>
        <form style={{ margin: "auto", padding: "15px", maxWidth: "400px", alignContent: "center"}} onSubmit={handleSubmit}>
           <label htmlFor='task'>Task</label>
           <input type='text' id='task' name='task' placeholder='Your Task...' value={task || ""} onChange={handleInputChange}></input>
           <label htmlFor='discription'>Discription</label>
           <input type='text' id='discription' name='discription' placeholder='Enter Discription...' value={discription || ""} onChange={handleInputChange}></input>
           <input type='submit' value={id? "Update" : "Save"}/>
           <Link to="/">
              <input type='button' value="Go Back"/>
           </Link>
        </form>
    </div>
  )
}
