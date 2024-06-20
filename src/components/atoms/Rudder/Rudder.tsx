import RudderProps from "./Rudder.types";
import "./Rudder.scss";
import { useEffect } from "react";

const Rudder: React.FC<RudderProps> = ({ totalRudderAngle, elementRadius }) => {
    const determineRudderAngle = (totalAngle: number, radius: number) => {
        const width = radius * 2;
        const height = radius * 2;
        const centerX = radius;
        const centerY = radius;

        // 
        const angle = totalAngle / 2;
        
        // Calculate the endpoint of the arc for port side
        const portAngle = angle * Math.PI / 180;
        const portX = centerX + radius * Math.sin(portAngle);
        const portY = centerY - radius * Math.cos(portAngle);

        // Calculate the endpoint of the arc for starboard side
        const starboardAngle = -angle * Math.PI / 180;
        const starboardX = centerX + radius * Math.sin(starboardAngle);
        const starboardY = centerY - radius * Math.cos(starboardAngle);

        return(
            <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
                <g>
                    <path className="rudder-port" d={`M${centerX},${centerY} L${centerX},${centerY - radius} A${radius},${radius} 0 0,1 ${portX},${portY} Z`} />
                    <path className="rudder-starboard" d={`M${centerX},${centerY} L${centerX},${centerY - radius} A${radius},${radius} 0 0,0 ${starboardX},${starboardY} Z`} />
                </g>
                <g id="rudder-pointer" className="rudder-pointer">
                    <polygon points={`${radius},0 ${radius - 5},10 ${radius + 5},10`} />
                    <line x1={centerX} y1={centerY} x2={centerX} y2={centerY - radius + 2} />
                </g>
            </svg>
        )
    };

    const updateRudderPosition = (updatedAngle: number) => {
        const rudderPointer = document.getElementById("rudder-pointer");
        rudderPointer?.setAttribute("transform", `rotate(${updatedAngle}, ${elementRadius}, ${elementRadius})`)
    };

    useEffect(() => {
        updateRudderPosition(-35)
    }, [])

    return(
        <div className="rudder">
            {determineRudderAngle(totalRudderAngle, elementRadius)}
        </div>
    );
};

export default Rudder;