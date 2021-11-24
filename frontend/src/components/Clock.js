import React, { useState } from 'react'

function Clock() {
    const [Ctime, setCtime] = useState('')
    const updateTime = () => {
        let date = new Date()
        let datetime = {
            year: date.getFullYear(),
            month: date.getMonth() + 1, // ПОТОМУ ЧТО НУМЕРАЦИЯ НАЧИНАЕТСЯ С ЧЕГО? ПРАВИЛЬНО
            day: date.getDate(),
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds(),
        }
        setCtime(datetime)
    }
    setInterval(updateTime, 1000)
    return (
        <div>
            <strong>{Ctime.year}-{Ctime.month}-{Ctime.day} {Ctime.hours}:{Ctime.minutes}:{Ctime.seconds}</strong>
        </div>
    )
}

export default Clock