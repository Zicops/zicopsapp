import { useEffect, useRef, useState } from "react";
import styles from "../vctoolMain.module.scss";
const WhiteBoard = () => {
    const [IsDrawing, setIsDrawing] = useState(false)
    const [LineWidth, setLineWidth] = useState(1);
    const [Color, setColor] = useState("#000000")
    const CanvasRef = useRef(null)
    const ctx = useRef(null)
    const timeout = useRef(null);
    const Change = (e) => {
        setColor(e.target.value)
        setLineWidth(e.target.value)
    }
    useEffect(() => {
        const canvas = CanvasRef.current;
        ctx.current = canvas.getContext("2d");
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;


        const canvasimg = localStorage.getItem("canvasimg");
        if (canvasimg) {
            var image = new Image();
            ctx.current = canvas.getContext("2d");
            image.onload = function () {
                ctx.current.drawImage(image, 0, 0);
                setIsDrawing(false);
            };
            image.src = canvasimg;
        }
    }, [ctx])

    const StartPosition = (e) => {
        setIsDrawing(true)
        Draw(e)
    }

    const FinishedPosition = (e) => {
        setIsDrawing(false)
        ctx.current.beginPath();
    }

    const Draw = (e) => {
        if (!IsDrawing) {
            return;
        }
        const canvas = CanvasRef.current;
        ctx.current = canvas.getContext("2d");
        ctx.current.lineWidth = LineWidth;
        ctx.current.lineCap = "round";
        ctx.current.strokeStyle = Color;
        ctx.current.lineTo(e.clientX, e.clientY)
        ctx.current.stroke();
        ctx.current.beginPath();
        ctx.current.moveTo(e.clientX, e.clientY);

        if (timeout.current !== undefined) {
            clearTimeout(timeout.current);
        }
        timeout.current = setTimeout(() => {
            var savedimg = canvas.toDataURL("image/png");
            localStorage.setItem("canvasimg", savedimg);
        }, 1);
    }
    return (
        <div className={`${styles.whiteBoard}`}>
            <div className={`${styles.whiteBoardControlls}`}>
                <div>
                    <input onChange={Change} type="color" />
                </div>
                <div>
                    <select style={{ width: "3rem", height: "1.6rem" }} onChange={Change}>
                        <option> 1 </option>
                        <option> 3 </option>
                        <option> 5 </option>
                        <option> 10 </option>
                        <option> 15 </option>
                        <option> 20 </option>
                        <option> 25 </option>
                        <option> 30 </option>
                    </select>
                </div>
                <div>
                    <button style={{ width: "4rem", height: "1.6rem" }} onClick={() => {
                        localStorage.removeItem("canvasimg");
                        const canvas = CanvasRef.current;
                        const context = canvas.getContext("2d");
                        context.fillStyle = "white";
                        context.fillRect(0, 0, canvas.width, canvas.height);
                    }}>clear All</button>
                </div>
            </div>
            <canvas ref={CanvasRef} className={`${styles.whitepage}`} onMouseDown={StartPosition}
                onMouseUp={FinishedPosition} onMouseMove={Draw}>

            </canvas>

        </div>
    )
};
export default WhiteBoard;