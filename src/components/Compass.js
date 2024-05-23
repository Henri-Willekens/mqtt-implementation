import React, { useState } from 'react';
import {useEffect} from 'react';

export default function Compass(props) {
  let [currentHeading, setCurrentHeading] = useState(0);

  function updateheading(targetHeading) {
    let headingArrow= document.getElementById("hdg");
    headingArrow.setAttribute("transform", `rotate(${targetHeading}, 200, 200)`)
  }
  

  function updateCOG(targetHeading) {
    let COGArrow= document.getElementById("cog");
    COGArrow.setAttribute("transform", `rotate(${targetHeading + 20}, 200, 200)`)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeading(prevHeading => (prevHeading + 5));
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    updateheading(currentHeading)
    updateCOG(currentHeading);
  }, [currentHeading])

  return (
    <div className='Comp'>
        <svg width="400" height="400">
            <circle className="windrose" cx="200" cy="200" r="150" fill="none" stroke="#353548" strokeWidth="20" />

            <g id="ticks">

            </g>

            <g className="windrose-lines" fontSize="12">
                <g>
                    <line x1="200" y1="45" x2="200" y2="55" stroke="#EFEFEF" />
                    <text x="200" y="35" fill="#EFEFEF" textAnchor="middle">0</text>
                </g>
                <g>
                    <line x1="200" y1="345" x2="200" y2="355" stroke="#EFEFEF" />
                    <text x="200" y="375" fill="#EFEFEF" textAnchor="middle">180</text>
                </g>
                <g>
                    <line x1="355" y1="200" x2="345" y2="200" stroke="#EFEFEF" />
                    <text x="370" y="205" fill="#EFEFEF" textAnchor="middle">90</text>
                </g>
                <g>
                    <line x1="55" y1="200" x2="45" y2="200" stroke="#EFEFEF" />
                    <text x="25" y="205" fill="#EFEFEF" textAnchor="middle">270</text>
                </g>
            </g>
        
            <g className="inner-windrose-lines">
                <line x1="70" y1="200" x2="330" y2="200" stroke="#EFEFEF"/>
                <line x1="200" y1="70" x2="200" y2="330" stroke="#EFEFEF"/>
            </g>
        
            <g id="hdg">
                <path className="compass-ship" stroke="#EFEFEF" strokeWidth="2" fill="#353548" d="M 180 120 L 180 335 L 220 335 L 220 120 C 220 93 206 65 200 65 C 194 65 180 93 180 120 Z" />    
            </g>
       
            <g id="cog" fill="#EFEFEF" stroke="#EFEFEF">    
                <line strokeDasharray="15" x1="200" y1="70" x2="200" y2="200" strokeWidth="3" />
                <polygon points="200,60 210,80 190,80" />
                <circle cx="200" cy="200" r="5" />
            </g>        
        </svg>
    </div>
  );
}