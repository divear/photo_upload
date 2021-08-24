import React, { useEffect, useState } from 'react'
import {storage} from "../firebase"
import firebase from 'firebase'
var storageRef = firebase.storage().ref("imgs");


function Home() {
    const [pl, setPl] = useState()
    const [data, setData] = useState([])
    useEffect(()=>{
        const posts = storageRef.listAll().then(posts => {
            setPl(posts.items.length)
            posts.items.forEach(function(imageRef) {
                // And finally display them
                displayImage(imageRef);
              });
        })
    },[])

    function displayImage(imageRef) {
        imageRef.getDownloadURL().then(function(url) {
            data.push(url)
            setData(data)
            
        }).catch(function(error) {
          console.log(error);
        });
      }
      function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r && 0x3 | 0x8);
          return v.toString(16);
        });
      }

      if(!data[1] && pl){
          setData(localStorage.getItem("data").split(","));
      }
   
    return (
        <div>
            <a className="newDrawing" href="/editor">Draw a new drawing</a>
            <div className="posts">
                {
                    data[0] && data.map(d =>{
                        localStorage.setItem("data", data)
                        return(
                            <div key={uuidv4()}>
                                <img className="img" src={d} alt="img" />
                                <p>{d}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home
