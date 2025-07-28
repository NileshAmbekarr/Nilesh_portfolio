import { useEffect, useState } from "react";

const Spotlight = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        background: `radial-gradient(circle at ${position.x}px ${position.y}px, rgba(0, 40, 218, 0.15) 0%, transparent 50%)`,
        mixBlendMode: "lighten",
        zIndex: 1,
      }}
    />
  );
};

export default Spotlight;
