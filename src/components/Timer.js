import React, {useEffect, useState} from 'react';

const Timer = ({setGameOver}) =>{
    const [time, setTime] = useState(5);

    useEffect(
        () =>{
            if(time > 0)
            {
                const intervalId = setInterval(() =>{
                    setTime(prevTime => prevTime - 1)
            }, 1000);            
            return () => {
                clearInterval(intervalId);
            };
        } else {
            setGameOver(prevGame => prevGame = true);
        }
    }, [time]);
    console.log(time);
    const Print = () =>{
        return (
            <>
              {time !== 0 ? (
                <p>{time === 1 ? `${time} second has passed` : `${time} seconds have passed`}</p>
              ) : (
                <p>Ran out of time</p>
              )}
            </>
          );
        };

    return <Print />
}
export default Timer;