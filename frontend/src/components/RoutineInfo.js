import React from 'react'

function RoutineInfo({routine, weekdays, show}) {
  if (show){
    return (
      <>
        {routine.routine.map((day, index) => {
          return (<div style={{marginLeft:'20px'}}>{day.title}</div>)
        })}
      </>
    )
  } else {
    return (<></>)
  }
}

export default RoutineInfo
