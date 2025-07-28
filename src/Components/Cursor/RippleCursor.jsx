'use client';
import React, { useReducer, useEffect } from 'react';
const rippleReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_RIPPLE':
      return [...state, action.payload].slice(-30);
    case 'REMOVE_RIPPLE':
      return state.filter((ripple) => ripple.id !== action.payload);
    default:
      return state;
  }
};
const RippleCursor = ({ maxSize = 50, duration = 1000, blur = true }) => {
  const [ripples, dispatch] = useReducer(rippleReducer, []);
  const handleMouseMove = (e) => {
    const ripple = {
      id: `${Date.now()}-${Math.random()}`,
      x: e.clientX,
      y: e.clientY,
    };
    dispatch({ type: 'ADD_RIPPLE', payload: ripple });
    setTimeout(() => {
      dispatch({ type: 'REMOVE_RIPPLE', payload: ripple.id });
    }, duration);
  };
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [duration]);
  return (
    <div
    style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 9999,
      }} >
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          style={{
            position: 'absolute',
            left: ripple.x,
            top: ripple.y,
            width: 20,
            height: 20,
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 149, 255, 0.10)',
            boxShadow: '0 0 10px rgba(0,150,255,0.7), 0 0 20px rgba(0,150,255,0.4)',
            filter: blur ? 'blur(4px)' : 'none',
            transform: 'translate(-50%, -50%)',
            animation: `ripple ${duration}ms ease-out forwards`,
          }}
        />
      ))}
       {/* CSS keyframes (can also be placed in your App.css) */}
       <style>
        {`
          @keyframes ripple {
            from {
              transform: translate(-50%, -50%) scale(1);
              opacity: 1;
            }
            to {
              transform: translate(-50%, -50%) scale(2.5);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};
export default RippleCursor;
