import { useEffect, useState } from 'react'
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { GoCheckCircleFill } from "react-icons/go";

import './App.css'
import Form from './Form'
import axios from 'axios'

function App() {
  const [todos, setTodo] = useState([])

 const handleEdit = (id)=>{
axios.put("http://localhost:1515/api/task/update/"+id)
.then(result=>{location.reload()})
.catch(err=>console.log(err))
 }
 const handleDele = (id)=>{
  axios.delete("http://localhost:1515/api/task/delete/"+id)
.then(result=>{location.reload()})
.catch(err=>console.log(err))
 }
 useEffect(()=>{
axios.get("http://localhost:1515/api/task/get")
.then(result=>setTodo(result.data))
.catch(err=>console.log(err))
  },[])

  return (
   <>
   <main id="todolist">
  <h1>
    Todo List
    <span>Get things done, one item at a time.</span>
  </h1>

  <div class="togglebutton-wrapper" v-bind:class="isactive ? 'togglebutton-checked' : ''">
      <label v-bind:for="name">
        <span class="togglebutton-label">name</span>
        <span class="tooglebutton-box"></span>
      </label>
      <input v-bind:id="name" type="checkbox" v-bind:name="name" v-model="isactive" v-on:change="onToogle"/>
  </div>

  <div style={{
    height:"40vh",
    overflow:"scroll",

    
  }} >
 { todos.length === 0 ? 
 <p v-else className="emptylist">Your todo list is empty.</p>
 :
 
 todos.map(todo=>(
  <div class="togglebutton-wrapper" v-bind:class="isactive ? 'togglebutton-checked' : ''">
  <label v-bind:for="name">

  {todo.done ? <GoCheckCircleFill/> :<IoCheckmarkCircleOutline onClick={()=>handleEdit(todo._id)} /> }
  
    <span class="togglebutton-label" > {todo.task}
    
    </span>
    <MdDeleteForever style={{
      
      cursor:"pointer"
    }} 
    onClick={()=>handleDele(todo._id)}
    />
  </label>
  <input v-bind:id="name" type="checkbox" v-bind:name="name" v-model="isactive" v-on:change="onToogle"/>
</div>

 ))
 }
 </div>

  <Form/>
</main>
   </>
  )
}

export default App
