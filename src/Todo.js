import React, { useEffect, useState } from 'react';
import './Todo.css';
import AddTask from './AddTask';
import { TextField, Button, IconButton, FormControl, Avatar } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import db from './Firebase';
import { useStatevalue } from './StateProvider';
import firebase from 'firebase';
import { actionTypes } from './reducer';

function Todo() {

  const [{ user }, dispatch] = useStatevalue();
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState("");

  useEffect(() => {
    db.collection("todos").doc(user.uid).collection("todo")
      .onSnapshot(snapshot => {
        setTasks(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })))
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Please enter valid task")
    } else {
      db.collection("todos").doc(user.uid).collection("todo").add({
        task: input,
        complete: false
      })
    }
    setInput("");
  }

  const signout = () => {

    firebase.auth().signOut().then(() => {
      console.log("Signout successful");
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });

    dispatch({
      type: actionTypes.SET_USER,
      user: null,
    });

  }

  return (
    <div className="todo">
      <div className="todo_signout">
        <div className="avatar">
          <Avatar src={user.photoURL} />
          <span>{user.displayName}</span>
        </div>
        <Button color="primary" variant="contained" onClick={signout}>Signout</Button>
      </div>
      <div className="todo_container">
        <div className="todo_form">
          <FormControl>
            <TextField id="standard-basic" label="Enter a task" onChange={(e) => setInput(e.target.value)} value={input} />
            <IconButton type="submit" style={{ backgroundColor: "lightblue" }} onClick={handleSubmit}>
              <Add style={{ color: "#3f51b5" }} />
            </IconButton>
          </FormControl>
        </div>
        <div className="todo_tasks">
          {tasks && tasks.map((item) => {
            return (
              <AddTask id={item.id} task={item.data.task} complete={item.data.complete} />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Todo