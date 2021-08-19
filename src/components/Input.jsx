import React, { useState } from 'react'
import { storage } from '../firebase';

function Input() {
    const [photo, setPhoto] = useState("")
    const [photUrl , setPhotoUrl] = useState("")

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
                    })
            }
        )
    }
    console.log(photo);

    return (
        <div>
            
            <input onChange={(e) =>handleChange(e)} type="file" />
            <button onClick={handleSubmit} type="submit">send</button>
        
            <img className="photo" src={photUrl} alt="file not chosen" />
        </div>
    )
}

export default Input;