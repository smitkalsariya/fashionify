import React, { useState } from 'react'
import './signup.scss'

export default function Signup() {
    const [data, setData] = useState()
  

    return (
        <div className='signup'>
            <div className='container'>
                <section>
                    <h1>Signup</h1>
                    <label>
                        <span>Username</span>
                        <input type="text" />
                    </label>
                    <label>
                        <span>Email</span>      
                        <input type="email" />
                    </label>
                    <label>
                        <span>Password</span>
                        <input type="password" />
                    </label>
                    <button>Signup</button>
                </section>
            </div>
        </div>
    )
}
