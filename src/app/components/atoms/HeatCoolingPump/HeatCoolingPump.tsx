
import React, { useEffect, useState } from "react";

import HeatCoolingProps from './HeatCoolingPump.types';
import "./HeatCoolingPump.scss";

const HeatCooling: React.FC<HeatCoolingProps> = ({ id, configEnabled }) => {
  const [_internalInterval, setInternalInterval] = useState<any>();
  const [_currentRotation, setCurrentRotation] = useState(0);
  const [_isEnabled, setIsEnabled] = useState(false);


  const enableSpinAnimation = () => {
    setInternalInterval(setInterval(() => {
      setCurrentRotation(_prevRotation => (_prevRotation + 36));
    }, 200));
  };


  const disableSpinAnimation = () => {
    clearInterval(_internalInterval);
  };


  const turnOnOrOff = () => {
    if (_isEnabled) {
      setIsEnabled(false);
    } else {
      setIsEnabled(true);
    }
  };


  useEffect(() => {
    // The actual spinning motion of the blades
    const _element = document.getElementById("spin");
    _element?.setAttribute("transform", `rotate(${_currentRotation}, 9.256, 10.93)`)
  }, [_currentRotation]);


  useEffect(() => {
    // For now checks it based on a local variable, but in the future this should be from the MQTT broker
    if (_isEnabled) {
      enableSpinAnimation();
    } else {
      disableSpinAnimation();
    }
  }, [_isEnabled]);


  return (
    <div className={`heat-cooling ${id}`} onClick={configEnabled ? () => {} : turnOnOrOff}>
      <svg xmlns="http://www.w3.org/2000/svg" width="64px" height="64px" viewBox="0 0 24 24" version="1.1">
        <path d="M 4.1406 22.207 C 3.8125 22.1445 3.4883 21.8828 3.3203 21.5508 C 3.2266 21.3633 3.2227 21.3555 3.2227 21.0664 C 3.2227 20.7891 3.2305 20.7617 3.3047 20.6055 C 3.3477 20.5156 3.6016 20.1367 3.8711 19.7656 C 4.1406 19.3945 4.4531 18.957 4.5664 18.7969 L 4.7773 18.5078 L 4.4805 18.3203 C 3.5898 17.7578 2.7617 17 2.1094 16.1367 C 0.4141 13.9023 -0.1016 10.9648 0.7305 8.2969 C 1.1836 6.8438 1.9766 5.5938 3.1406 4.4922 C 4.5039 3.2031 6.2734 2.3789 8.1797 2.1406 C 8.7188 2.0742 9.5352 2.0664 14.8398 2.0625 L 20.3789 2.0625 L 20.3867 1.6758 C 20.3984 1.2383 20.4258 1.1563 20.5703 1.0781 C 20.6484 1.0352 20.7656 1.0313 22.0273 1.0313 C 23.5352 1.0313 23.4922 1.0273 23.5938 1.1875 C 23.6406 1.2656 23.6445 1.3242 23.6367 5.7227 C 23.6289 9.9297 23.625 10.1836 23.582 10.2461 C 23.4727 10.4102 23.543 10.4063 21.9961 10.4063 C 20.6172 10.4063 20.5938 10.4023 20.5195 10.3516 C 20.3828 10.25 20.3594 10.1641 20.3594 9.75 L 20.3594 9.375 L 19.207 9.375 C 18.1211 9.375 18.0547 9.375 18.0664 9.418 C 18.1641 9.7188 18.2188 10.9922 18.1602 11.6484 C 18.0078 13.4297 17.3008 15.125 16.1406 16.5039 C 15.9063 16.7852 15.3125 17.375 15.0313 17.6133 C 14.7305 17.8633 14.3086 18.168 14.0117 18.3516 L 13.7617 18.5 L 13.8047 18.5664 C 13.8281 18.6016 13.9414 18.7656 14.0586 18.9258 C 14.957 20.168 15.1719 20.4727 15.2266 20.5938 C 15.4844 21.1445 15.2344 21.8398 14.6836 22.1055 C 14.5938 22.1484 14.457 22.1953 14.3828 22.2109 C 14.2109 22.2422 4.3086 22.2383 4.1406 22.207 Z M 14.4023 21.4063 C 14.5898 21.2969 14.668 21.0625 14.5742 20.8828 C 14.5547 20.8398 14.418 20.6445 14.2773 20.4453 C 14.1367 20.2461 13.8203 19.8008 13.5742 19.457 L 13.1289 18.8281 L 13.0391 18.875 C 12.9883 18.8984 12.793 18.9844 12.5977 19.0586 C 10.9063 19.7422 8.9297 19.8789 7.1367 19.4336 C 6.7227 19.332 6.1367 19.1367 5.7969 18.9883 C 5.4219 18.8242 5.4531 18.8242 5.3398 18.9805 C 5.1563 19.2227 4.0273 20.8164 3.9922 20.8828 C 3.8984 21.0469 4.0156 21.3555 4.2031 21.4336 C 4.2695 21.4648 5.1289 21.4688 9.2852 21.4727 L 14.2891 21.4727 Z M 9.9102 18.9492 C 11.4336 18.8203 12.7539 18.3516 13.9883 17.5078 C 14.9414 16.8555 15.7109 16.0313 16.3633 14.9766 C 16.875 14.1484 17.2461 13.1016 17.4141 12.043 C 17.4648 11.7266 17.4727 11.5781 17.4727 10.8906 C 17.4727 10.0742 17.4531 9.832 17.3359 9.3242 C 17.2734 9.0469 17.2813 8.8945 17.3555 8.7969 C 17.4688 8.6445 17.4258 8.6484 18.9688 8.6406 L 20.3828 8.6328 L 20.3828 2.8008 L 14.4297 2.8086 L 8.4727 2.8164 L 8.1211 2.8711 C 7.2031 3.0156 6.418 3.2617 5.6172 3.6563 C 3.9219 4.4883 2.5391 5.9141 1.7773 7.6172 C 1.1758 8.9609 0.957 10.4023 1.1328 11.8438 C 1.5508 15.2891 4.2031 18.1211 7.6484 18.8086 C 7.9453 18.8672 8.4453 18.9375 8.7461 18.957 C 9.0117 18.9766 9.6328 18.9727 9.9102 18.9492 Z M 3.6445 15.7305 C 3.457 15.6016 2.9063 14.8086 2.6328 14.2695 C 2.2695 13.5625 2.0977 13.0742 1.9219 12.2656 C 1.8594 11.9844 1.8125 11.5273 1.7969 11.0938 C 1.7383 9.3164 2.332 7.5938 3.4688 6.2188 C 4.6484 4.793 6.2695 3.8867 8.125 3.6055 C 8.2734 3.582 8.625 3.5586 8.9023 3.5508 C 9.3789 3.5391 9.4102 3.5391 9.4922 3.5898 C 9.6406 3.6836 9.6914 3.9023 9.6055 4.0742 C 9.543 4.1992 9.4219 4.2539 9.1992 4.2539 C 8.7109 4.2539 8.0273 4.3516 7.4922 4.4961 C 4.9766 5.1758 3.0586 7.2578 2.6172 9.793 C 2.4219 10.9258 2.5234 12.0625 2.918 13.1563 C 3.1836 13.8906 3.5078 14.4609 4.0586 15.1641 C 4.1719 15.3125 4.1953 15.3555 4.1953 15.4453 C 4.1953 15.5703 4.1133 15.7109 4.0117 15.7578 C 3.9063 15.8125 3.75 15.8008 3.6445 15.7305 Z" />
        <path id="spin" d="M 6 15 C 6.5195 15.3828 5.6523 14.7109 5.0273 13.8047 C 4.8203 13.5 4.543 12.9102 4.418 12.5039 C 4.0703 11.3672 4.2031 10.1992 4.7656 9.457 C 4.8438 9.3555 4.8906 9.3164 4.9727 9.2969 C 5.1953 9.2383 5.3281 9.3281 5.5117 9.6719 C 5.7266 10.0664 5.9219 10.3359 6.1719 10.582 C 6.5156 10.9258 6.8242 11.0625 7.2344 11.0625 C 7.4297 11.0625 7.6875 11.0234 7.7539 10.9844 C 7.7695 10.9727 7.7891 10.9102 7.793 10.8438 L 7.8008 10.7188 L 7.6094 10.6172 C 6.625 10.0977 5.9375 9.2891 5.7578 8.4531 C 5.707 8.2188 5.707 7.7695 5.7578 7.5781 C 5.8828 7.1016 6.2227 6.7383 6.8594 6.4023 C 7.2891 6.1719 7.8477 6 8.4258 5.9219 C 8.8398 5.8633 9.6523 5.8828 10.0117 5.957 C 11.1836 6.2031 12.1445 6.8594 12.5703 7.6953 C 12.6914 7.9336 12.707 8.0625 12.625 8.1953 C 12.5391 8.3359 12.457 8.3555 11.9102 8.3555 C 11.3711 8.3555 11.0547 8.3906 10.7773 8.4922 C 10.3047 8.6602 9.9961 8.9805 9.8398 9.4609 C 9.8047 9.5742 9.8008 9.6133 9.8242 9.6211 C 9.8438 9.6289 9.8945 9.6602 9.9453 9.6914 L 10.0352 9.75 L 10.1289 9.6875 C 10.3281 9.5508 10.8281 9.3203 11.1055 9.2344 C 11.5938 9.0781 11.7344 9.0547 12.2617 9.0547 C 12.7031 9.0547 12.7617 9.0625 12.9883 9.125 C 13.4297 9.2461 13.6719 9.375 13.9102 9.6211 C 14.1953 9.918 14.3047 10.25 14.3242 10.8789 C 14.3438 11.5117 14.2578 11.9844 14.0078 12.6016 C 13.8203 13.0625 13.6797 13.3086 13.375 13.7148 C 12.5508 14.8164 11.4258 15.4492 10.3711 15.4023 C 10.0117 15.3867 9.8789 15.3359 9.8125 15.1875 C 9.7461 15.0234 9.7773 14.8906 9.9609 14.6211 C 10.2969 14.1133 10.4961 13.6289 10.5234 13.25 C 10.5391 12.9766 10.5039 12.793 10.3867 12.5625 C 10.3008 12.3945 10.0859 12.1172 10.0195 12.0898 C 10 12.082 9.9375 12.0977 9.875 12.125 L 9.7656 12.1797 L 9.7656 12.5898 C 9.7578 13.4961 9.4844 14.3125 8.9961 14.875 C 8.4883 15.457 7.9102 15.6875 7.2852 15.5508 Z M 8.0586 14.7969 C 8.6367 14.5156 9.0742 13.6328 9.125 12.6289 L 9.1406 12.332 L 9.0664 12.3164 C 8.8164 12.2617 8.7422 12.2422 8.6016 12.1719 C 8.4414 12.0938 8.2305 11.918 8.1328 11.7813 L 8.082 11.707 L 7.875 11.75 C 7.168 11.8984 6.5508 11.7734 6.0117 11.375 C 5.8047 11.2188 5.4531 10.8555 5.293 10.625 L 5.1641 10.4375 L 5.1289 10.5234 C 5.0078 10.8125 4.9883 11.5391 5.0938 11.9844 C 5.4023 13.3086 6.2422 14.375 7.3086 14.8164 C 7.5898 14.9297 7.793 14.9258 8.0586 14.7969 Z M 11.2617 14.6172 C 11.7188 14.457 12.2617 14.0664 12.6445 13.6289 C 13.2969 12.8789 13.6836 11.9453 13.6953 11.1055 C 13.6992 10.6797 13.6563 10.4805 13.5195 10.2813 C 13.0898 9.6523 11.8711 9.6289 10.8008 10.2305 C 10.6875 10.2969 10.5938 10.3477 10.5898 10.3516 C 10.5898 10.3516 10.6172 10.4414 10.6523 10.5469 C 10.7656 10.8828 10.7539 11.2617 10.6172 11.5195 C 10.5781 11.5898 10.582 11.5977 10.7031 11.7344 C 11.0117 12.082 11.1602 12.3398 11.2578 12.6992 C 11.3906 13.207 11.2852 13.9492 10.9922 14.5234 C 10.9531 14.6055 10.918 14.6836 10.918 14.6953 C 10.918 14.7305 11 14.7109 11.2617 14.6172 Z M 9.5625 11.5547 C 10.1367 11.2656 10.0938 10.4609 9.4922 10.25 C 8.9688 10.0664 8.4258 10.5313 8.5391 11.0625 C 8.6367 11.5234 9.1406 11.7656 9.5625 11.5547 Z M 8.2422 9.9336 C 8.3125 9.8633 8.4258 9.7695 8.4922 9.7266 C 8.6484 9.6289 8.9531 9.5273 9.0938 9.5273 L 9.2031 9.5273 L 9.2344 9.3906 C 9.2773 9.1992 9.4297 8.8477 9.5391 8.6875 C 9.75 8.3711 10.0469 8.125 10.4141 7.957 C 10.7461 7.8047 10.9922 7.75 11.6406 7.6758 L 11.7578 7.6602 L 11.5898 7.5039 C 11.168 7.1094 10.5273 6.8125 9.8203 6.6836 C 9.4258 6.6094 8.5977 6.6172 8.2383 6.6953 C 7.6875 6.8125 7.2188 7.0195 6.8711 7.2969 C 6.5469 7.5508 6.4727 7.6953 6.4727 8.0625 C 6.4688 8.2422 6.4844 8.332 6.5352 8.4844 C 6.6953 8.9648 7.1016 9.4414 7.6406 9.8008 C 7.8164 9.9141 8.0742 10.0586 8.1016 10.0625 C 8.1094 10.0625 8.1719 10.0039 8.2422 9.9336 Z" />
      </svg>
    </div>
  );
};


export default HeatCooling;