import React, { useState } from 'react'
import TaskList from './components/TaskList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {

  const [time, setTime] = useState({ms:0, s:0, m:0, h:0});
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);

  //status0 = noStarted, status1 = started, status2 = pause

  const start = () => {
    run();
    setStatus(1);
    setInterv(setInterval(run, 10));
  }

  var updateMs = time.ms, updateS = time.s, updateM = time.m, updateH = time.h;

  const run = () => {
    if(updateM === 60){
      updateH++;
      updateM = 0;
    }

    if(updateS === 60){
      updateM++;
      updateS = 0;
    }

    if(updateMs === 100){
      updateS++;
      updateMs = 0;
    }

    updateMs++;
    return setTime({ms:updateMs, s:updateS, m:updateM, h:updateH});
  }

  const stop = () => {
    clearInterval(interv);
    setStatus(2);
  }

  const reset = () => {
    setInterval(interv);
    setStatus(0);
    setTime({ms:0, s:0, m:0, h:0});
  }

  const resume = () => start();

  const saveTask = async () => {

    const content = {
      "content": (time.h >= 10 ? time.h : "0" + time.h)+':'+(time.m >= 10 ? time.m : "0" + time.m)+':'+(time.s >= 10 ? time.s : "0" + time.s)+':'+(time.ms >= 10 ? time.ms : "0" + time.ms)
    }

    try {
      const res = await fetch('http://localhost:4000/task', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(content),
      })

      const data = await res.json()

      reset()
      notify()
      
      window.location.reload(false)
    } catch (error) {
      console.log(error)
    }
  }

  const notify = () => toast("Exito!, la operación se realizo con exito");

  return (
    <div className='w-full h-screen flex flex-col space-y-5 justify-center items-center bg-gray-800 px-40'>
      <div className='flex flex-col md:flex-row justify-center items-center space-x-4'>

        <button disabled={status !== 1 ? false:true} onClick={status === 0 ? start : resume} className='w-40 h-40 rounded-full bg-green-200 hover:bg-green-400 flex justify-center items-center'>
          <i className="uil uil-play text-6xl font-bold text-green-700 hover:text-green-900"></i>
        </button>

        <div className='h-80 w-80 bg-gray-200 rounded-full border-8 border-blue-600 flex justify-center items-center text-gray-600 text-4xl'> 
          <span className='font-bold uppercase'>{time.h >= 10 ? time.h : "0" + time.h}</span>&nbsp;:&nbsp;
          <span className='font-bold uppercase'>{time.m >= 10 ? time.m : "0" + time.m}</span>&nbsp;:&nbsp;
          <span className='font-bold uppercase'>{time.s >= 10 ? time.s : "0" + time.s}</span>&nbsp;:&nbsp;
          <span className='font-bold uppercase'>{time.ms >= 10 ? time.ms : "0" + time.ms}</span>
        </div>
        <button disabled={status === 1 ? false:true} onClick={stop} className='w-40 h-40 rounded-full bg-red-200 hover:bg-red-400 flex justify-center items-center'>
          <i className="uil uil-pause text-6xl font-bold text-red-700 hover:text-red-900"></i>
        </button>
      </div>
      <div className='flex space-x-4'>
        <button disabled={status === 2 ? false:true} onClick={reset} className='bg-gray-500 h-20 w-20 rounded-full flex justify-center items-center'>
          <i className="uil uil-sync text-white font-bold text-2xl"></i>
        </button>
        <button disabled={status === 2 ? false:true} onClick={saveTask} className='bg-blue-500 h-20 w-20 rounded-full flex justify-center items-center'>
          <i className="uil uil-save text-white font-bold text-2xl"></i>
        </button>
      </div>
      <div className='bg-gray-600 w-full h-40 rounded-md p-6 overflow-y-auto text-white'>
        <h2 className='mb-2 font-bold text-xl'>Records</h2>
        <TaskList />
      </div>
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
    </div>
  )
}