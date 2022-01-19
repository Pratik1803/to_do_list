import React from 'react';
import Styles from "./Home.module.scss";
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../env/test.env';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Button, CircularProgress, TextField } from '@material-ui/core';

function Home() {
    const search = useLocation().search;
    const name = new URLSearchParams(search).get("username");
    const [newTask,setNewTask] = useState("");
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [contextTask,setContextTask] = useState([])

    const getUserInfo = async ()=>{
        setLoading(true);
        await axios({
            method:"get",
            url:`${BASE_URL}/home?username=${name}`,
        }).then((res)=>{
            setUser(res.data);
            setContextTask(res.data.tasks);
            setLoading(false);
            // console.log(res.data);
        }).catch((err)=>{
            console.log(err);
        });
    };


    // for adding tasks
    const addTask = async ()=>{
        setLoading(true);
        await axios({
            method:"post",
            url:`${BASE_URL}/home?username=${name}`,
            data:{
                task:newTask,
            }
        }).then((res)=>{
            setContextTask((previous)=>([...previous,newTask]));
            // console.log(contextTask);
            setNewTask("");
            setLoading(false);
        }).catch((err)=>{
            console.log(err);
        });
    };


    //for deleteing tasks
    const doneTask = async (task)=>{
        setLoading(true);
        await axios({
            method:"delete",
            url:`${BASE_URL}/home?username=${name}`,
            data:{
                task,
            }
        }).then((res)=>{
            setContextTask((previous)=>(previous.filter(item=>item!==task)))
            // console.log(res);
            setLoading(false);
        }).catch((err)=>{
            console.log(err)
        });
    }


    useEffect(()=>{
        getUserInfo();
    },[]);

    function Tasks(props){
        return <div className={Styles.task}>
            <span>{props.index}. {props.task}</span>
            <div className={Styles.task_btn}>
            <Button onClick={()=>{
                doneTask(props.task)
            }}><Icon icon="mdi:check" color="#fff"/></Button>
            </div>
        </div>
    }

    return (
        <div className={Styles.home}>
            <div className={Styles.home_container}>
                <h1>Hello {user.username},</h1>
                <h2>Let's get some work done!</h2>

                <div className={Styles.task_container}>
                    <div className={Styles.add_task}>
                        <TextField variant="standard" size="small" value={newTask} onChange={(e)=>{setNewTask(e.target.value)}} />
                        <Button onClick={addTask}>Add</Button>
                    </div>
                    {loading?<CircularProgress/>:contextTask.length===0?<p>No tasks for now! Add some...</p>:<div className={Styles.task_wrapper}>
                    <h3>Your tasks:</h3>
                    <div className={Styles.tasks}>
                        {contextTask.map((task,index)=><Tasks key={index} index={index+1} task={task} />)}
                    </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Home
