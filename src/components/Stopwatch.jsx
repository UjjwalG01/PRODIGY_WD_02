import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

export function Stopwatch() {
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);
    const intervalRef = useRef(null)
    const startTimeRef = useRef(0);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime(Date.now() - startTimeRef.current)
            }, 10)
        }
        return () => {
            clearInterval(intervalRef.current)
        }
    }, [isRunning])

    function start() {
        setIsRunning(true);
        startTimeRef.current = Date.now() - time
    }
    function stop() {
        setIsRunning(false);
    }
    function reset() {
        setIsRunning(false)
        setTime(0)
    }

    function formatTime() {
        let hours = Math.floor(time / (1000 * 60 * 60));
        let minutes = Math.floor(time / (1000 * 60) % 60);
        let seconds = Math.floor(time / (1000) % 60);
        let milliseconds = Math.floor((time % 1000) / 10);

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");

        return `${hours}:${minutes}:${seconds}:${milliseconds}`;
    }

    return (
        <section className="container">
            <h2 className="title">Stopwatch</h2>
            <div className="stopwatch">
                {formatTime()}
            </div>
            <div className="controls">
                <button onClick={start} id="start">Start</button>
                <button onClick={stop} id="stop">Stop</button>
                <button onClick={reset} id="reset">Reset</button>
            </div>
        </section>
    )
}