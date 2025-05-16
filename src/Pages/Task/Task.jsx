import React from 'react';
import './task.css'
import { useState, useEffect, useContext } from 'react';
import DataContext from '../../Context/DataContext'

const Task = () => {

    const { user } = useContext(DataContext);
    const [newTask, setNewTask] = useState('')


    return (
        <div className='task_container'>
            <form className='addForm'>
                <input type="text"
                    className='formInput'
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button className='addButton'>Add</button>
            </form>
        </div>
    );
}

export default Task;
