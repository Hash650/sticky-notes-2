import React, { useState } from 'react'

const NoteLock = ({bgcolor, lockNote}) => {

    const [icon, setIcon] = useState('unlocked-icon')


    const toggleLockNotePos = () => {

        if(icon === 'unlocked-icon')
        {
            lockNote(true)
            setIcon('thumbtack-icon')
        }
        else 
        {
            lockNote(false)
            setIcon('unlocked-icon')
        }
    }

  return (
    <div className='lock-icon' style={{
        backgroundColor: bgcolor
    }}
    onClick={toggleLockNotePos}
    >
        <img src={icon+'.svg'} alt="" />
    </div>
  )
}

export default NoteLock