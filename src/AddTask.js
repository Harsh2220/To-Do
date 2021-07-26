import React, { useEffect, useState } from 'react';
import './AddTask.css';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import db from './Firebase';
import { useStatevalue } from './StateProvider';

function AddTask({ id, task, complete }) {

    const [{ user }, dispatch] = useStatevalue();
    const [check, setCheck] = useState(false);

    const deleteItem = () => {

        db.collection("todos").doc(user.uid).collection("todo").doc(id).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });

    }

    useEffect(() => {
        if (complete === false) {
            setCheck(false)
        }
        else {
            setCheck(true)
        }
    }, ["",check])

    const handleChange = (event) => {
        setCheck(event.target.checked);

        if (check === true) {
            db.collection("todos").doc(user.uid).collection("todo").doc(id).update({
                complete: false
            })
        }
        if (check === false) {
            db.collection("todos").doc(user.uid).collection("todo").doc(id).update({
                complete: true
            })
        }

    };

    return (
        <div className="addTask" id={id}>
            <FormControlLabel
                id="para"
                value="end"
                control={<Checkbox color="primary" checked={check} onChange={handleChange} />}
                label={task}
                labelPlacement="end"
            />
            <IconButton onClick={deleteItem}>
                <DeleteIcon style={{ color: "red" }} />
            </IconButton>
        </div>
    )
}

export default AddTask;