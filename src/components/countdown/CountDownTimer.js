import React, { useEffect, useState } from 'react'
import './CountDownTimer.css';

const CountDownTimer = () => {
    const [countdownTime, setCountdownTime] = useState(0);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [timerActive, setTimerActive] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [inputError, setInputError] = useState('');

    useEffect(() => {
        if (timerActive) {
            const intervalId = setInterval(() => {
                setCountdownTime(prevTime => {
                    if (prevTime <= 0) {
                        clearInterval(intervalId);
                        setTimerActive(false);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [timerActive]);

    useEffect(() => {
        const days = Math.floor(countdownTime / (3600 * 24));
        const remainingHours = countdownTime % (3600 * 24);
        const hours = Math.floor(remainingHours / 3600);
        const remainingMinutes = remainingHours % 3600;
        const minutes = Math.floor(remainingMinutes / 60);
        const seconds = remainingMinutes % 60;

        setDays(days);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
    }, [countdownTime]);

    const handleStartStop = () => {
        if (timerActive) {
            setTimerActive(false);
        } else {
            const totalSeconds = calculateTotalSeconds(userInput);
            if (totalSeconds > 0) {
                setCountdownTime(totalSeconds);
                setTimerActive(true);
                setInputError('');
            } else {
                setInputError('Invalid input. Please enter a valid time.');
            }
        }
    };

    const calculateTotalSeconds = (input) => {
        const parts = input.split(':');
        if (parts.length === 3) {
            const hours = parseInt(parts[0]);
            const minutes = parseInt(parts[1]);
            const seconds = parseInt(parts[2]);
            if (!isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
                return hours * 3600 + minutes * 60 + seconds;
            }
        }
        return -1;
    };

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    return (
        <div className="countdown-container">
            <h1>Countdown Timer</h1>
            <div className="input-container">
                <label>
                    Set Timer (HH:MM:SS):
                </label>
                <input type="text" value={userInput} onChange={handleInputChange} placeholder='HH:MM:SS' />
                <button className="start-stop-btn" onClick={handleStartStop}>{timerActive ? 'Stop' : 'Start'}</button>
            </div>
            {inputError && <p className="error-msg">{inputError}</p>}
            <div className="countdown-time">

                <div className="time-display">
                    <div className="time-unit">
                        <p>{days}</p>
                        <p>Days</p>
                    </div>
                    <div className="time-unit">
                        <p>{hours}</p>
                        <p>Hours</p>
                    </div>
                    <div className="time-unit">
                        <p>{minutes}</p>
                        <p>Minutes</p>
                    </div>
                    <div className="time-unit">
                        <p>{seconds}</p>
                        <p>Seconds</p>
                    </div>
                </div>
            </div>
        </div>
    );



}

export default CountDownTimer