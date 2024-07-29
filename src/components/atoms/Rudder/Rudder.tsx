import { useEffect, useState } from "react";

import FormModal from "../../molecules/FormModal/FormModal";
import Input from "../Input/Input";

import RudderProps from "./Rudder.types";
import "./Rudder.scss";

const Rudder: React.FC<RudderProps> = ({ id, totalRudderAngle, elementRadius, configEnabled }) => {
  const [_isModalOpen, setIsModalOpen] = useState(false);
  const [_formValues, setFormValues] = useState({
    totalRudderAngle: totalRudderAngle,
    elementRadius: elementRadius
  });


  const determineRudderAngle = () => {
    const _width = elementRadius * 2;
    const _height = elementRadius * 2;
    const _centerX = elementRadius;
    const _centerY = elementRadius;

    // Determine half of the angle, so one half can be colored green, and the other red
    const angle = totalRudderAngle / 2;

    // Calculate the endpoint of the arc for port side
    const _portAngle = angle * Math.PI / 180;
    const _portX = _centerX + elementRadius * Math.sin(_portAngle);
    const _portY = _centerY - elementRadius * Math.cos(_portAngle);

    // Calculate the endpoint of the arc for starboard side
    const _starboardAngle = -angle * Math.PI / 180;
    const _starboardX = _centerX + elementRadius * Math.sin(_starboardAngle);
    const _starboardY = _centerY - elementRadius * Math.cos(_starboardAngle);

    return (
      <svg width={_width} height={_height} viewBox={`0 0 ${_width} ${_height}`}>
        <g>
          <path className="rudder-port" d={`M${_centerX},${_centerY} L${_centerX},${_centerY - elementRadius} A${elementRadius},${elementRadius} 0 0,1 ${_portX},${_portY} Z`} />
          <path className="rudder-starboard" d={`M${_centerX},${_centerY} L${_centerX},${_centerY - elementRadius} A${elementRadius},${elementRadius} 0 0,0 ${_starboardX},${_starboardY} Z`} />
        </g>
        <g id="rudder-pointer" className="rudder-pointer">
          <polygon points={`${elementRadius},0 ${elementRadius - 5},10 ${elementRadius + 5},10`} />
          <line x1={_centerX} y1={_centerY} x2={_centerX} y2={_centerY - elementRadius + 2} />
        </g>
      </svg>
    )
  };

  const updateRudderPosition = (updatedAngle: number) => {
    const rudderPointer = document.getElementById("rudder-pointer");
    rudderPointer?.setAttribute("transform", `rotate(${updatedAngle}, ${elementRadius}, ${elementRadius})`)
  };


  const openModal = () => {
    if (configEnabled) {
      setIsModalOpen(true);
    };
  };


  const closeModal = () => {
    setIsModalOpen(false);
  };


  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const _name = event.target.name;
    const _value = event.target.value;

    setFormValues((_prevFormValues) => ({
      ..._prevFormValues,
      [_name]: _value
    }));
  };


  useEffect(() => {
    updateRudderPosition(-35)
  }, [])

  return (
    <>
      <div key={id} onDoubleClick={openModal} className="rudder">
        {determineRudderAngle()}
      </div>
      <FormModal isOpen={_isModalOpen} onClose={closeModal} cancelText="Discard changes" submitText="Save changes">
        <Input type="number" label="Total rudder angle" value={_formValues.totalRudderAngle} id="totalRudderAngle" name="totalRudderAngle" onChange={handleFormChange} />
        <Input type="number" label="Element radius" value={_formValues.elementRadius} id="elementRadius" name="elementRadius" onChange={handleFormChange} />
      </FormModal>
    </>
  );
};

export default Rudder;