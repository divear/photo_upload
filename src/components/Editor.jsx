import React, { useEffect, useRef, useState } from 'react'


function Editor(photoUrl) {
    const [cw, setcw] = useState(1250)
    const [ch, setch] = useState(500)
    const [lineWidth, setLineWidth] = useState(3)
    const url = photoUrl.photoUrl || localStorage.getItem("url")

    const canvasRef = useRef(null);
    const [context, setContext] = useState(null);
    const [color, setColor] = useState("black")

    if(cw > 1300){
      setcw(1300)
    }
    if(ch > 500){
      setch(500)
    }
  
    useEffect(() => {
      let mouseDown = false;
      let start = { x: 0, y: 0 };
      let end = { x: 0, y: 0 };
      let canvasOffsetLeft = 0;
      let canvasOffsetTop = 0;
  
      function handleMouseDown(evt) {
        mouseDown = true;
  
        start = {
          x: evt.clientX - canvasOffsetLeft,
          y: evt.clientY - canvasOffsetTop,
        };
  
        end = {
          x: evt.clientX - canvasOffsetLeft,
          y: evt.clientY - canvasOffsetTop,
        };
      }
  
      function handleMouseUp(evt) {
        mouseDown = false;
      }
  
      function handleMouseMove(evt) {
        if (mouseDown && context) {
          start = {
            x: end.x,
            y: end.y,
          };
  
          end = {
            x: evt.clientX - canvasOffsetLeft,
            y: evt.clientY - canvasOffsetTop,
          };
  
          // Draw our path
          context.beginPath();
          context.lineCap = "round";
          context.moveTo(start.x, start.y);
          context.lineTo(end.x, end.y);
          context.strokeStyle = color;
          context.lineWidth = lineWidth;
          context.stroke();
          context.closePath();
          console.log(color);
        }
      }
  
      
  
      if (canvasRef.current) {
        const renderCtx = canvasRef.current.getContext('2d');
  
        if (renderCtx) {
          canvasRef.current.addEventListener('mousedown', handleMouseDown);
          canvasRef.current.addEventListener('mouseup', handleMouseUp);
          canvasRef.current.addEventListener('mousemove', handleMouseMove);
  
          canvasOffsetLeft = canvasRef.current.offsetLeft;
          canvasOffsetTop = canvasRef.current.offsetTop;
  
          setContext(renderCtx);
        }
      }
  
      //draw image
      if (context) {
        const image = new Image();
        image.src = url;
        image.onload = () => {
          if(lineWidth === 3 && color === "black"){
            context.drawImage(image, 0, 0);
          }
        }
      }
  
      return function cleanup() {
          
        if (canvasRef.current) {
          canvasRef.current.removeEventListener('mousedown', handleMouseDown);
          canvasRef.current.removeEventListener('mouseup', handleMouseUp);
          canvasRef.current.removeEventListener('mousemove', handleMouseMove);
        }
      }
    }, [context, color, lineWidth]);

    return (
        <div>
            <input onChange={(e)=>setcw(e.target.value)} min="50" max="1300" value={cw} type="number" placeholder="width"/>
            <input onChange={(e)=>setch(e.target.value)} min="50" max="500" value={ch} type="number" placeholder="heigth" />
          
            <canvas
                id="canvas"
                ref={canvasRef}
                width={cw}
                height={ch}
                style={{
                border: '2px solid #000',
                marginTop: 10,
                }}
            ></canvas>
            <input type="color" onChange={(e)=>setColor(e.target.value)} value={color} />
            <input min="1" id="range" onChange={e => setLineWidth(e.target.value)} value={lineWidth} type="range" />
            <label htmlFor="range">{lineWidth}</label>
        </div>
    )
}

export default Editor
