import React, { useState } from 'react'
import { storage } from '../firebase';

function Input() {
    const [photo, setPhoto] = useState("")

    function handleChange(e){
        if(e.target.files[0]){
            setPhoto(e.target.files[0])
        }
    }
    function handleSubmit(){

    }
    console.log(photo);

    return (
        <div>
            <form onSubmit={handleSubmit} action="">
                <input onChange={(e) =>handleChange(e)} type="file" />
                <button>send</button>
            </form>
        </div>
    )
}

export default Input;