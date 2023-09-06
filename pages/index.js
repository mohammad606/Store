import React,{useState,useEffect} from 'react'
import { auth } from './api/fireBase'
import { signInWithEmailAndPassword } from "firebase/auth";
import style from '../styles/logIn.module.css'
import {useRouter} from "next/router";
import {onAuthStateChanged} from "firebase/auth";

export default function Login() {
    //--------------------------------------------------------------------------- (To ensure that the user has access to the page).
    const router = useRouter()
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
               return router.push('/home')
            }else {
                console.log('no user')
                return true
            }
        } )
    },[])
    //--------------------------------------------------------------------------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const login = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
            .then((res) => {
                    window.localStorage.setItem('admin',res.user.uid)
                    window.history.forward()
                window.location.href = "/home";
                }
            )
            .catch((error) => console.log(error))
    }


    return (
        <div className={style.logBody}>
            <img src="https://dc700.4shared.com/img/2vmme74Pjq/s24/189a79f3ff8/wallpaperflarecom_wallpaper?async=&rand=0.06381768409681698" alt="" />
            <div className={style.loginBox}>
                <h2>Login</h2>
                <form>
                    <div className={style.userBox}>
                        <input type="email" name="" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete='off' required />
                        <label htmlFor="">Email</label>
                    </div>
                    <div className={style.userBox}>
                        <input type="password" name="" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete='off' required />
                        <label htmlFor="">Password</label>
                    </div>
                    <button className={style.btn} id="aSubmit" onClick={login}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}



