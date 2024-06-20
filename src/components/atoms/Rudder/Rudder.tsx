import RudderProps from "./Rudder.types";
import "./Rudder.scss";
import { useEffect } from "react";

const Rudder: React.FC<RudderProps> = ({ angle }) => {
    const determineRudderAngle = (radius: number, degrees: number) => {
        const centerX = radius;
        const centerY = radius;

        // Calculate the endpoint of the arc for port side
        const portAngle = degrees * Math.PI / 180;
        const portX = centerX + radius * Math.sin(portAngle);
        const portY = centerY - radius * Math.cos(portAngle);

        // Calculate the endpoint of the arc for starboard side
        const starboardAngle = -degrees * Math.PI / 180;
        const starboardX = centerX + radius * Math.sin(starboardAngle);
        const starboardY = centerY - radius * Math.cos(starboardAngle);

        return(
            <svg width="180" height="180" viewBox="0 0 180 180">
                <g>
                    <path className="rudder-port" d={`M${centerX},${centerY} L${centerX},${centerY - radius} A${radius},${radius} 0 0,1 ${portX},${portY} Z`} />
                    <path className="rudder-starboard" d={`M${centerX},${centerY} L${centerX},${centerY - radius} A${radius},${radius} 0 0,0 ${starboardX},${starboardY} Z`} />
                </g>
                <g id="rudder-pointer" className="rudder-pointer">
                    <polygon points="90,0 85,10 95,10" />
                    <line x1={centerX} y1={centerY} x2={centerX} y2={centerY - radius + 2} />
                </g>
            </svg>
        )
    };

    const updateRudderPosition = (updatedAngle: number) => {
        const rudderPointer = document.getElementById("rudder-pointer");
        rudderPointer?.setAttribute("transform", `rotate(${updatedAngle}, 90, 90)`)
    };

    useEffect(() => {
        updateRudderPosition(-35)
    }, [])

    return(
        <div className="rudder">
            {determineRudderAngle(90, 90)}
        </div>
    );
};

export default Rudder;