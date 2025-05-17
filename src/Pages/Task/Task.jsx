import './task.css'
import { useState, useEffect, useContext } from 'react';
import DataContext from '../../Context/DataContext'
import { get, set, ref, push, update, getDatabase, remove } from "firebase/database";
import { app } from '../../hooks/firebase_config';
import { AiTwotoneDelete } from "react-icons/ai";
const Task = () => {

    const { user } = useContext(DataContext);
    const [newTask, setNewTask] = useState('')
    const [allTasks, setAllTasks] = useState([])
    const data = getDatabase(app)

    const fetchTasks = async () => {
        try {
            const tasksRef = ref(data, user.id);
            const snapshot = await get(tasksRef);

            if (snapshot.exists()) {
                const tasksData = snapshot.val();

                const tasksArray = Object.entries(tasksData).map(([id, task]) => ({
                    id,
                    ...task
                }));
                setAllTasks(tasksArray);
                console.log(tasksArray);
            } else {
                console.log("No tasks found.");
            }
        } catch (err) {
            console.error("Error fetching tasks:", err.message);
        }
    }

    useEffect(() => {
        fetchTasks()
    }, [])

    const addTask = async (e) => {
        e.preventDefault();
        if (newTask.trim() === '') return
        try {
            const taskRef = ref(data, user.id)
            await push(taskRef, {
                'task': newTask,
                'checked': false
            })
        } catch (err) {
            console.log(err.message);

        } finally {
            setNewTask('')
            fetchTasks()
        }

    }

    const updateCheck = async (id, task, check) => {
        try {
            const taskRef = ref(data, `${user.id}/${id}`)
            await set(taskRef, {
                'task': task,
                'checked': check
            })
        } catch (err) {
            console.log(err.message);

        } finally {
            setNewTask('')
            fetchTasks()
        }


    }

    const deleteTask = async (id) => {
        try {
            const taskRef = ref(data, `${user.id}/${id}`)
            await remove(taskRef)
        } catch (err) {
            console.log(err.message);
        } finally {
            fetchTasks();
        }
    }


    return (
        <div className='task_container'>
            <form className='addForm' onSubmit={(e) => addTask(e)}>
                <input type="text"
                    className='formInput'
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    required
                />
                <button className='addButton' type='submit'>Add</button>
            </form>

            <section>
                <fieldset className='tasks_list'>
                    <legend>Tasks List</legend>
                    {allTasks.length == 0 ? <p>No tasks !</p> :
                        (
                            allTasks.map((task) =>
                                <main key={task.id} className='single_task'>
                                    <input
                                        type="checkbox"
                                        checked={task.checked}
                                        onChange={() => updateCheck(task.id, task.task, !task.checked)}
                                    />
                                    <p
                                        className={task.checked ? "check" : ''}
                                    >{task.task}</p>
                                    <button 
                                    onClick={() => deleteTask(task.id)} 
                                    className='delete'
                                    title='Delete'
                                    ><AiTwotoneDelete /></button>
                                </main>
                            )
                        )}
                </fieldset>
            </section>
        </div>
    );
}

export default Task;
