import { motion } from "motion/react";
import "./Gallery.css";

// ─── Data — replace placeholders with real photo imports ────────────────────
// e.g. `import Trip1 from '../../assets/Gallery/trip1.jpg'` then
// { src: Trip1, note: 'that one evening in the hills', alt: 'Hills at dusk' }

const placeholderPhoto = (label, from, to) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480" viewBox="0 0 640 480">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${from}"/><stop offset="100%" stop-color="${to}"/>
      </linearGradient></defs>
      <rect width="640" height="480" fill="url(#g)"/>
      <circle cx="520" cy="110" r="46" fill="rgba(255,255,255,0.35)"/>
      <path d="M0 360 L140 250 L260 340 L400 210 L640 380 L640 480 L0 480 Z" fill="rgba(255,255,255,0.22)"/>
      <text x="320" y="255" text-anchor="middle" font-family="monospace" font-size="24" fill="rgba(60,50,40,0.7)">${label}</text>
    </svg>`
  )}`;

const PHOTOS = [
  {
    src: placeholderPhoto("your photo 1", "#f3d9c6", "#e8b4a0"),
    note: "replace me with a real memory — Gallery.jsx",
    alt: "Placeholder photo 1",
  },
  {
    src: placeholderPhoto("your photo 2", "#cfe3d4", "#a3c9b2"),
    note: "a little note about this one goes here :)",
    alt: "Placeholder photo 2",
  },
  {
    src: placeholderPhoto("your photo 3", "#d6dcf0", "#aab6e0"),
    note: "some days deserve to be kept forever",
    alt: "Placeholder photo 3",
  },
  {
    src: placeholderPhoto("your photo 4", "#f0e3c0", "#ddc07e"),
    note: "chai > everything else",
    alt: "Placeholder photo 4",
  },
  {
    src: placeholderPhoto("your photo 5", "#ecd4e0", "#cfa0bd"),
    note: "the pile keeps growing...",
    alt: "Placeholder photo 5",
  },
];

// Deterministic "tossed on a table" placements, cycled by index
const PLACEMENTS = [
  { x: "-5%", y: "-3%", r: -5 },
  { x: "6%", y: "3%", r: 4.5 },
  { x: "-3%", y: "4%", r: -2.5 },
  { x: "7%", y: "-4%", r: 6 },
  { x: "-7%", y: "1%", r: -3.5 },
  { x: "2%", y: "-2%", r: 3 },
];

// ─── Photo card ───────────────────────────────────────────────────────────────

function GalleryItem({ photo, index }) {
  const place = PLACEMENTS[index % PLACEMENTS.length];
  const noteSide = index % 2 === 0 ? "right" : "left";

  return (
    <div className="g-slot">
      <motion.figure
        className="g-polaroid-wrap"
        style={{ x: place.x, y: place.y }}
        initial={{ rotate: place.r + 9, scale: 1.09 }}
        whileInView={{ rotate: place.r, scale: 1 }}
        viewport={{ amount: 0.35, once: true }}
        transition={{ type: "spring", stiffness: 65, damping: 12 }}
      >
        <div className="g-polaroid">
          <img src={photo.src} alt={photo.alt} draggable="false" />
        </div>

        {photo.note && (
          <figcaption className={`g-note g-note--${noteSide}`}>
            <span className="g-note-tape" />
            {photo.note}
          </figcaption>
        )}
      </motion.figure>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Gallery() {
  return (
    <main className="gallery-page">
      <div className="g-flowers" aria-hidden="true" />

      <p className="g-hint">scroll &darr;</p>

      {PHOTOS.map((photo, i) => (
        <GalleryItem key={i} photo={photo} index={i} />
      ))}

      <p className="g-fin">&mdash; fin &mdash;</p>
    </main>
  );
}
