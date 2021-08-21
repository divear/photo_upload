import React, { useState } from 'react'
import { storage } from '../firebase';
import Editor from './Editor';

function Input() {
    const [photo, setPhoto] = useState("")
    const [photoUrl , setPhotoUrl] = useState("")
    const [error, setError] = useState("")

    function handleChange(e){
        if(e.target.files[0]){
            setPhoto(e.target.files[0])
        }
    }
    function handleSubmit(){
        if(!photo){
            setError("No photo provided.")
            return;
        }
        setError("")
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#1c1f42" fillOpacity="1" d="M0,224L26.7,192C53.3,160,107,96,160,74.7C213.3,53,267,75,320,74.7C373.3,75,427,53,480,64C533.3,75,587,117,640,133.3C693.3,149,747,139,800,112C853.3,85,907,43,960,64C1013.3,85,1067,171,1120,202.7C1173.3,235,1227,213,1280,202.7C1333.3,192,1387,192,1413,192L1440,192L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"></path>
            </svg>

            <h1>Photo editor</h1>
            {/* <input
             accept="image/png, image/gif, image/jpeg" className="photoInput"
              onChange={(e) =>handleChange(e)} type="file" />
            <button onClick={handleSubmit} type="submit">Confirm</button>
            <h1 className={error ? "error" : "no"}>{error}</h1> */}
            <Editor photoUrl={photoUrl}/>
        </div>
    )
}

export default Input;