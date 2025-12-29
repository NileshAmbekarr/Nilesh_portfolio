import { useEffect } from "react";

export default function Stars() {
  useEffect(() => {
    const canvas = document.getElementById("stars");
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const STAR_COUNT = 90;
    const LENSING_STRENGTH = 0.35; // 👈 controls swirl amount

    function createStar() {
      const z = Math.random(); // depth
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z,
        size: z * 1.6 + 0.4,
        speed: z * 0.9 + 0.15,
        baseAlpha: z * 0.7 + 0.3, // opacity baseline
        angle: Math.random() * Math.PI * 2, // orbit bias
      };
    }

    const stars = Array.from({ length: STAR_COUNT }, createStar);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      for (const s of stars) {
        const dx = cx - s.x;
        const dy = cy - s.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        // ---- 1. RADIAL FORCE (gravity) ----
        const nx = dx / dist;
        const ny = dy / dist;

        // ---- 2. TANGENTIAL FORCE (lensing) ----
        const tx = -ny;
        const ty = nx;

        // combine forces
        s.x += nx * s.speed + tx * LENSING_STRENGTH * s.z;
        s.y += ny * s.speed + ty * LENSING_STRENGTH * s.z;

        // ---- OPACITY CONTROL ----
        // brighter near center, dimmer far away
        const fade = Math.max(0, 1 - dist / (canvas.width * 0.6));
        ctx.globalAlpha = s.baseAlpha * fade;

        // respawn when consumed
        if (dist < 6) {
          Object.assign(s, createStar());
          continue;
        }

        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(draw);
    };

    draw();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      id="stars"
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
}
