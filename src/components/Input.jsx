import React, { useState } from 'react'
import { storage } from '../firebase';
import Editor from './Editor';

function Input() {
    const [photo, setPhoto] = useState("")
    const [photoUrl , setPhotoUrl] = useState("")

    function handleChange(e){
        if(e.target.files[0]){
            setPhoto(e.target.files[0])
        }
    }
    function handleSubmit(){
        const uploadTask = storage.ref(`images/${photo.name}`).put(photo)
        uploadTask.on(
            "state changed",
            snapshot => {},
            error => {
                console.log(error);
            },
            ()=>{
                storage
                    .ref("images")
                    .child(photo.name)
                    .getDownloadURL()
                    .then(url =>{
                        setPhotoUrl(url)
                        console.log(url);
                        localStorage.setItem("url", url)
                    })
            }
        )
    }
    console.log(photo);

    return (
        <div>
            <h1>Photo editor</h1>
            <input className="photoInput" onChange={(e) =>handleChange(e)} type="file" />
            <button onClick={handleSubmit} type="submit">Confirm</button>
            <Editor photoUrl={photoUrl}/>
        </div>
    )
}

export default Input;