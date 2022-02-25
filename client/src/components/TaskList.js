import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as timeago from 'timeago.js';


function TaskList() {

    const [tasks, setTasks] = useState([])

    const getTasks = async () => {
        try {
            const response = await fetch('http://localhost:4000/task')
            const data = await response.json()
            setTasks(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTasks()
    }, [])

    const deleteTask = async (id) => {
        try {
            const res = await fetch(`http://localhost:4000/task/${id}`, {
                method: 'DELETE'
            })
            setTasks(tasks.filter(task => task.id !== id))
            notify()
        } catch (error) {
            console.log(error)
        }
    }

    const notify = () => toast("Exito!, la operación se realizo con exito");

    return (
        <>
        {
            tasks.length === 0 ?
            <h1>No hay registros para mostrar</h1>
            :
            tasks.map((task, index) =>(
                <div key={index}>
                    <div className='bg-gray-800 mb-2 p-2 rounded-md flex justify-between items-center'>
                        <p>{task.content}</p>
                        <p>
                            {timeago.format(task.createdAt)}
                        </p>
                        <button onClick={() => deleteTask(task.id)} className='bg-red-500 rounded-full w-6 h-6 justify-center items-center'>
                            <i className="uil uil-trash-alt"></i>
                        </button>
                    </div>
                </div>
            ))
        }
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
        </>
    )
}

export default TaskList