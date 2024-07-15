import React from 'react';

import './Bal.scss';
import BalProps from './Bal.types';

const Ball: React.FC<BalProps> = ({ }) => {
    let _offsetX : any
    let _offsetY : any
  const move = (event: any) =>
  {
    console.log(event.pageX, event.pageY, _offsetX, _offsetY)
    const el = event.target;
    el.style.left = `${event.pageX - _offsetX}px`
    el.style.top = `${event.pageY - _offsetY}px`
  }
  const add = (event: any) => {
        console.log('added listener')
        console.log(event.clientX)
        const _element = event.target
        console.log(_element.getBoundingClientRect().left)
        _offsetX = event.clientX - _element.getBoundingClientRect().left
        _offsetY = event.clientY - _element.getBoundingClientRect().top
        _element.addEventListener('mousemove', move)
    }
    
    const remove = (event: any) =>{
        console.log('remove listener')
        const el=event.target
        el.removeEventListener('mousemove', move)
    }

  return (
    <div className="test" onMouseDown={add} onMouseUp={remove}/>
  )
}

export default Ball;