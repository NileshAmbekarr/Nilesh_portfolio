import { motion } from "motion/react";
import "./Hero.css";

// ── Photos ────────────────────────────────────────────────────────────────────
// Swap these imports for other photos (background-removed PNGs look best):
//   CenterCutout — the big b&w cutout over the headline
//   FaceLeft / FaceRight — the two small floating face photos
import CenterCutout from "../Intro/Photo1.png";
// import FaceLeft from "../Intro/Photo2.png";
// import FaceRight from "../Intro/Photo3.png";

// Staggered entrance for the headline lines
const lineVariants = {
  hidden: { opacity: 0, y: 42 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  return (
    <section className="hero-statement">
      <div className="hs-headline">
        {/* small floating face cutouts */}
        {/* <div className="hs-float hs-float--left" aria-hidden="true">
          <img src={FaceLeft} alt="" draggable="false" />
        </div> */}
        {/* <div className="hs-float hs-float--right" aria-hidden="true">
          <img src={FaceRight} alt="" draggable="false" />
        </div> */}

        <h2 className="hs-title">
          {["Fullstack,", "Backend &", "AI Engineer"].map((line, i) => (
            <motion.span
              key={line}
              className={`hs-line ${i === 0 ? "hs-line--solid" : "hs-line--outline"}`}
              custom={i}
              variants={lineVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              {line}
            </motion.span>
          ))}
        </h2>

        {/* center b&w cutout overlapping the lower lines; colours on hover */}
        <div className="hs-photo">
          <motion.img
            src={CenterCutout}
            alt="Nilesh Ambekar"
            draggable="false"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      <motion.div
        className="hs-actions"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <a href="#projects" className="hs-btn hs-btn--solid">See My Work</a>
        <a href="#contact" className="hs-btn hs-btn--ghost">Let&apos;s Connect</a>
      </motion.div>
    </section>
  );
}
