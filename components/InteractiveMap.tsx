"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

/*
  Decorative Brisbane map for /partnered-venues. Placeholder pins only — no venue
  names, tooltips or popups; the real lineup is revealed at launch.

  Loaded client-only (see BrisbaneMap.tsx, which dynamic-imports this with
  ssr:false): react-leaflet touches window on import and does not SSR cleanly.

  All interaction is off — it renders behind a blurred, pointer-events-none
  wrapper with the "Coming soon" overlay on top, so the visitor never pans or
  zooms it. Leaflet's own attribution control is disabled here because the wrapper
  blur would make it illegible; the page renders a legible OSM attribution link
  outside the blur instead (see page.tsx).

  Only the pins are branded, via a divIcon whose SVG reads --navy / --blue from
  :root (custom properties inherit down to Leaflet's marker pane).
*/

const BRISBANE: [number, number] = [-27.47, 153.025];

// Generic nightlife areas, not specific venues.
const PINS: [number, number][] = [
  [-27.457, 153.033], // Fortitude Valley
  [-27.482, 153.009], // West End
  [-27.47, 153.025], // Brisbane CBD
  [-27.482, 153.021], // South Bank
  [-27.468, 153.045], // New Farm
  [-27.479, 153.035], // Kangaroo Point
  [-27.452, 153.041], // Newstead
  [-27.461, 153.006], // Paddington
];

// Navy dot with a soft blue ring, held at ~70% so the pins read as "coming"
// rather than confirmed. Brand colours come from CSS custom properties.
const pinIcon = L.divIcon({
  className: "",
  iconSize: [22, 22],
  iconAnchor: [11, 11],
  html: `<svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="11" cy="11" r="9" style="fill:none;stroke:var(--blue);stroke-width:2;opacity:0.4" />
    <circle cx="11" cy="11" r="5.5" style="fill:var(--navy);opacity:0.72" />
  </svg>`,
});

export default function InteractiveMap() {
  return (
    <MapContainer
      center={BRISBANE}
      zoom={12}
      style={{ height: "100%", width: "100%" }}
      dragging={false}
      touchZoom={false}
      doubleClickZoom={false}
      scrollWheelZoom={false}
      boxZoom={false}
      keyboard={false}
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {PINS.map((position, i) => (
        <Marker key={i} position={position} icon={pinIcon} interactive={false} />
      ))}
    </MapContainer>
  );
}
