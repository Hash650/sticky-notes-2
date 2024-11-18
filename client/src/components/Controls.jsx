import React, { useEffect, useRef } from 'react'
import AddButton from './AddButton'
import Color from './Color'
import colors from "../assets/colors.json"
import { generateColorPosition } from '../utils/util'
import { useState } from 'react'

const Controls = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const controlsRef = useRef(null)
  const numColors = colors.length;
  const radius = 90

  useEffect(()=> {
    const handleClickOutside = (e) => {
      if(controlsRef.current && !controlsRef.current.contains(e.target))
      {
        setIsExpanded(false)
      }
    } 

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  },[])


  const handleAddButtonClick = () => {
    setIsExpanded(true)
  }


  return (
    <div id='controls' 
    ref={controlsRef}
      onMouseEnter={handleAddButtonClick} 
      
    >
      <AddButton />
      {colors.map((color) => {
        const {x,y}= generateColorPosition(color.id, numColors, radius)

        return (<Color key={color.id}
            color={color}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) ${isExpanded ? `translate(${x}px, ${y}px)` : 'translate(0, 0)'}`,
            transition: 'transform 0.5s ease-out',
            zIndex: -999999,
            backgroundColor: color.colorHeader
            
            
          }}
        />)
      })}
    </div>
  )
}

export default Controls