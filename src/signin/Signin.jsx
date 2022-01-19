import { Button, CircularProgress, TextField } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Styles from "./Signin.module.scss";
import { BASE_URL } from '../env/test.env';
import { useEffect } from 'react';
// import history from "../history";
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function Signin() {
    const history = useHistory();
    const [loading,setLoading] = useState(true);
    const [existingUsers, setExistingUsers] = useState([]);
    const [newUser,setNewUser] = useState({
        username:"",
        password:"",
        confirm_password:""
    });

    const getExistingUsers = async ()=>{
        setLoading(true);
        await axios({
            method:"get",
            url:`${BASE_URL}/sign-in`,
        }).then((res)=>{
            setExistingUsers(res.data);
            // console.log(res.data);
        }).catch((err)=>{
            console.log(err);
        });
        setLoading(false);
    }

    useEffect(() => {
        getExistingUsers();
    }, [])

    function submit(e){
        e.preventDefault();

        if(existingUsers.filter(user=>user===newUser.username)[0]){
            document.querySelector(".err").innerHTML = "Username already exixts!";
        }else if(newUser.password !==newUser.confirm_password){
            document.querySelector(".err").innerHTML = "Passwords do not match!";
            setNewUser((previous)=>{
                return{...previous, password:"", confirm_password:""}
            })
        }else{
            axios({
                method:"post",
                url:`${BASE_URL}/sign-in`,
                data:{
                    username:newUser.username,
                    password:newUser.password,
                }
            }).then((res)=>{
                setNewUser({
                    username:"",
                    password:"",
                    confirm_password:""
                });
                alert("Welcome to the club!");
                history.push(`/to_do_list/home?username=${newUser.username}`);
                // console.log(res);
            }).catch((err)=>{
                console.log(err);
            })
        }
    }

    return (
        <div className={Styles.signin}>
            <div className={Styles.signin_container}>
                <h1>Create New Account</h1>
                {loading?<CircularProgress/>:<form action="" onSubmit={submit}>
                    <label htmlFor="username">Username</label>
                    <TextField variant="standard" size='small' value={newUser.username} onChange={(e)=>{
                        setNewUser((previous)=>{
                            return {...previous, username:e.target.value}
                        })
                    }} />
                    <label htmlFor="password">Password</label>
                    <TextField variant="standard" type="password" value={newUser.password} size='small' onChange={(e)=>{
                        setNewUser((previous)=>{
                            return {...previous, password:e.target.value}
                        })
                    }} />
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <TextField variant="standard" type="password" size='small' value={newUser.confirm_password} onChange={(e)=>{
                        setNewUser((previous)=>{
                            return {...previous, confirm_password:e.target.value}
                        })
                    }} />
                    <p className='err' style={{color:"red", fontSize:"12px", marginTop:"5px"}}></p>
                    <div className={Styles.submit_btn}>
                        <Button type="submit">Create</Button>
                    </div>
                    <br/>
                    <span>Already have an account?<NavLink to="/">Log In</NavLink></span>
                </form>}
            </div>
        </div>
    )
}

export default Signin
