import React, { useState } from 'react'
import axios from 'axios'
const Form = () => {

    const [task, setTask] = useState()

    const handlesubmit = () =>{

        axios.post("http://localhost:1515/api/task/add", {task:task}).then(result=>{
            location.reload()
        }).catch(err=>console.log(err))
    }


  return (
    <div>
        <div className='form' name="newform" >
    <label for="newitem">Add to the todo list</label>
    <input onChange={(e)=>setTask(e.target.value)} type="text"/>
    <button type='button'  onClick={handlesubmit} >Add item</button>
  </div></div>
  )
}

export default Form