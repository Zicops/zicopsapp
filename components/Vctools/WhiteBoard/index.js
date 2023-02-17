import { useEffect, useRef, useState } from "react";
import styles from "../VctoolMain.module.scss"
import { Draw } from "../help/vctool.helper"
const WhiteBoard = () => {
    const [isDrawing, setisDrawing] = useState(false)
    const [lineWidth, setlineWidth] = useState(1);
    const [Color, setColor] = useState("#000000")
    const canvasRef = useRef(null)
    const ctx = useRef(null)
    const timeout = useRef(null);
    const options = [1, 3, 5, 10, 15, 20, 25, 30]
    const Change = (e) => {
        setColor(e.target.value)
        setlineWidth(e.target.value)
    }
    useEffect(() => {
        const canvas = canvasRef.current;
        ctx.current = canvas.getContext("2d");
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;


        const canvasimg = localStorage.getItem("canvasimg");
        if (canvasimg) {
            var image = new Image();
            ctx.current = canvas.getContext("2d");
            image.onload = function () {
                ctx.current.drawImage(image, 0, 0);
                setisDrawing(false);
            };
            image.src = canvasimg;
        }
    }, [ctx])

    const StartPosition = (e) => {
        setisDrawing(true)
        Draw(e)
    }

    const FinishedPosition = (e) => {
        setisDrawing(false)
        ctx.current.beginPath();
    }
    return (
        <div className={`${styles.WhiteBoard}`}>
            <div className={`${styles.whiteBoardControlls}`}>
                <div>
                    <input onChange={Change} type="color" />
                </div>
                <div>
                    <select style={{ width: "3rem", height: "1.6rem" }} onChange={Change}>
                        {
                            options.map((font) => {
                                return (
                                    <option>{font}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div>
                    <button style={{ width: "4rem", height: "1.6rem" }} onClick={() => {
                        localStorage.removeItem("canvasimg");
                        const canvas = canvasRef.current;
                        const context = canvas.getContext("2d");
                        context.fillStyle = "white";
                        context.fillRect(0, 0, canvas.width, canvas.height);
                    }}>clear All</button>
                </div>
            </div>
            <canvas ref={canvasRef} className={`${styles.whitepage}`} onMouseDown={StartPosition}
                onMouseUp={FinishedPosition} onMouseMove={(e) => {
                    Draw(e, canvasRef, ctx, lineWidth, Color, isDrawing, timeout)
                }}>

            </canvas>

        </div>
    )
};
export default WhiteBoard;