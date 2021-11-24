import React, { useState, useRef, useEffect } from 'react'


function Timer({ time }) {
    const [timerDays, setTimerDays] = useState('00')
    const [timerHours, setTimerHours] = useState('00')
    const [timerMinutes, setTimerMinutes] = useState('00')
    const [timerSeconds, setTimerSeconds] = useState('00')

    let interval = useRef()

    const startTimer = () => {
        const countdownDate = new Date(time).getTime();
        interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // console.log(days, hours, minutes, seconds)

            if (distance < 0) {
                // stop timer
                clearInterval(interval.current);
            } else {
                // update timer
                setTimerDays(days);
                setTimerHours(hours);
                setTimerMinutes(minutes);
                setTimerSeconds(seconds);
            }
        }, 1000)
    };

    useEffect(() => {
        startTimer();
        return () => {
            clearInterval(interval.current);
        }
    })

    return (
       <section className='timer'>
           <div>
               <section>
                   <p className='p-timer'>{timerDays}</p>
                   <p><small>Days</small></p>
               </section>
               <span className='p-timer'>:</span>
               <section>
                   <p className='p-timer'>{timerHours}</p>
                   <p><small>Hours</small></p>
               </section>
               <span className='p-timer'>:</span>
               <section>
                   <p className='p-timer'>{timerMinutes}</p>
                   <p><small>Minutes</small></p>
               </section>
               <span className='p-timer'>:</span>
               <section>
                   <p className='p-timer'>{timerSeconds}</p>
                   <p><small>Seconds</small></p>
               </section>
           </div>
       </section>
    )
}

export default Timer