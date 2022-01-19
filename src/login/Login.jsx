import React, { useEffect, useState } from 'react';
import Styles from "./Login.module.scss";
import axios from "axios";
import { Button, CircularProgress, TextField } from '@material-ui/core';
import {BASE_URL} from "../env/test.env";
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function Login() {

    const history = useHistory();
    const [loading,setLoading] = useState(true);
    const [userData, setUserData] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const getUserData = async ()=>{
        setLoading(true);
        await axios({
            method:"get",
            url:`${BASE_URL}/log-in`,
        }).then((res)=>{
            setUserData(res.data);        
            setLoading(false);
            console.log(res);
        });
    };

    useEffect(()=>{
        getUserData();
    },[]);

    function submit(e){
        e.preventDefault();
        const loggedUser = userData.filter(user=>user.username===username)[0];
        console.log(loggedUser)
        if(loggedUser){
            if(loggedUser.username === username && loggedUser.password === password){
                history.push(`/home?username=${username}`);
            }else{
                document.querySelector(".err").innerText = "Password or Username was incorrect.";
            }
        }else{
            alert("Username not found! Create an account first!")
        };
    //     usernames.forEach((user)=>{
    //         if(user===username){
    //             setFlag(false);
    //             alert("The username is already taken!");
    //         }else{
    //             (async function(){
    //                 axios({
    //                     method:"post",

    //                 })
    //             })();
    //         }
    // })
    };


    return (
        <div className={Styles.login}>
            <div className={Styles.login_container}>
                <h1>Welcome Back!</h1>
                {loading?<CircularProgress />:<form onSubmit={submit}>
                    <label htmlFor="username">Username:</label>
                    <TextField variant="standard" size='small' value={username} onChange={(e)=>{
                        setUsername(e.target.value);
                    }} />
                    <label htmlFor="password">Password:</label>
                    <TextField variant="standard" size='small' type="password" value={password} onChange={(e)=>{
                        setPassword(e.target.value);
                    }} />
                    <br/>
                    <p className="err" style={{color:"red", fontSize:"12px"}}></p>
                    <div className={Styles.submit_btn}>
                        <Button type="submit">Login</Button>
                    </div>
                    <span>Don't have an account?<NavLink to="/sign-in">Click Here.</NavLink></span>
                </form>}
            </div>
        </div>
    )
}

export default Login
