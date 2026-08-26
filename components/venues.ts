/*
  Partner venues — shared by the home logo slider and the /partnered-venues page.

  Two different assets per venue, because the two surfaces need different things:

  `logo` is the ORIGINAL supplied asset, used by the home slider. Note that none
  of these are transparent logos — every one is an opaque rectangle with a
  baked-in background (black, cream, purple, orange…) at its own arbitrary
  aspect ratio and padding. `w`/`h` are the real intrinsic pixel dimensions.

  `tile` is a normalised 4:3 crop generated from `logo`, used by the venue grid.
  Each mark was trimmed to its own bounding box, rescaled to a consistent optical
  size and re-centred on its own background colour, so a wall of them reads as
  one grid instead of fourteen mismatched rectangles. `bg` is that background
  colour — paint it behind the image so a dark tile doesn't flash white on load.

  Only venues that have confirmed being named publicly are shown. Everything else
  stays in this list, assets and all, but must render NOWHERE until it confirms:
  always read `publicVenues` (below), never `venues`, from anything user-facing.
*/

export type Venue = {
  name: string;
  slug: string;
  suburb: string;
  // The original supplied asset, at its real intrinsic dimensions.
  // `invert` flips a dark/transparent logo to white on navy.
  // `screen` blends a logo with a baked-in black background onto navy (drops the black).
  logo: { src: string; w: number; h: number; invert?: boolean; screen?: boolean };
  // Normalised 4:3 tile for the venue grid. `bg` matches the tile's own edges.
  tile: { src: string; bg: string };
  // Has the venue confirmed we can name them publicly? Gates all display.
  confirmed?: boolean;
};

// Every generated tile is the same size, so the grid can reserve its box once.
export const TILE_W = 640;
export const TILE_H = 480;

export const venues: Venue[] = [
  {
    name: "Eclipse",
    slug: "eclipse",
    suburb: "Fortitude Valley",
    logo: { src: "/venues/eclipse.png", w: 225, h: 225 },
    tile: { src: "/venues/tiles/eclipse.png", bg: "#000000" },
    confirmed: true,
  },
  {
    name: "Johnny Ringo's",
    slug: "johnny-ringos",
    suburb: "Fortitude Valley",
    logo: { src: "/venues/johnny-ringos.png", w: 1254, h: 1254 },
    tile: { src: "/venues/tiles/johnny-ringos.jpg", bg: "#fefefe" },
    confirmed: true,
  },
  {
    name: "Last Man Standing",
    slug: "last-man-standing",
    suburb: "Fortitude Valley",
    // TODO: This is a photo of the venue interior, not a logo — it is the only
    // asset supplied. It is the one tile in the grid that isn't a brand mark.
    // Replace with the confirmed Last Man Standing logo when it arrives.
    logo: { src: "/venues/last-man-standing.png", w: 1249, h: 844 },
    tile: { src: "/venues/tiles/last-man-standing.jpg", bg: "#140700" },
    confirmed: true,
  },
  {
    name: "Pawn & Co.",
    slug: "pawn-and-co",
    suburb: "Fortitude Valley",
    logo: { src: "/venues/pawn-and-co.png", w: 579, h: 328 },
    tile: { src: "/venues/tiles/pawn-and-co.png", bg: "#000000" },
    confirmed: true,
  },
  {
    name: "Pig N Whistle Brunswick Street",
    slug: "pig-n-whistle-brunswick-street",
    suburb: "Fortitude Valley",
    logo: { src: "/venues/pig-n-whistle-brunswick-street.jpg", w: 204, h: 192 },
    tile: { src: "/venues/tiles/pig-n-whistle-brunswick-street.jpg", bg: "#fcedda" },
    confirmed: true,
  },
  {
    name: "Pig N Whistle South Bank",
    slug: "pig-n-whistle-south-bank",
    suburb: "South Bank",
    logo: { src: "/venues/pig-n-whistle-south-bank.jpg", w: 204, h: 192 },
    tile: { src: "/venues/tiles/pig-n-whistle-south-bank.jpg", bg: "#f8ecd4" },
    confirmed: true,
  },
  {
    name: "Pop World Nightclub",
    slug: "pop-world-nightclub",
    suburb: "Fortitude Valley",
    logo: { src: "/venues/pop-world-nightclub.png", w: 225, h: 225 },
    tile: { src: "/venues/tiles/pop-world-nightclub.png", bg: "#ffffff" },
    confirmed: true,
  },
  {
    name: "Sugar Nightclub",
    slug: "sugar-nightclub",
    suburb: "Fortitude Valley",
    logo: { src: "/venues/sugar-nightclub.jpg", w: 447, h: 447 },
    tile: { src: "/venues/tiles/sugar-nightclub.png", bg: "#8b2ba6" },
    confirmed: true,
  },
  {
    name: "Summa House",
    slug: "summa-house",
    suburb: "Fortitude Valley",
    logo: { src: "/venues/summa-house.jpg", w: 204, h: 192 },
    tile: { src: "/venues/tiles/summa-house.jpg", bg: "#ff6803" },
    confirmed: true,
  },
  {
    name: "The Magee",
    slug: "the-magee",
    suburb: "Red Hill",
    logo: { src: "/venues/the-magee.png", w: 1448, h: 1086 },
    tile: { src: "/venues/tiles/the-magee.png", bg: "#0d341c" },
    confirmed: true,
  },
  {
    name: "The Normanby",
    slug: "the-normanby",
    suburb: "Paddington",
    logo: { src: "/venues/the-normanby.png", w: 447, h: 447 },
    tile: { src: "/venues/tiles/the-normanby.png", bg: "#000000" },
    confirmed: true,
  },
  {
    name: "Viscosity",
    slug: "viscosity",
    suburb: "CBD",
    logo: { src: "/venues/viscosity.png", w: 1254, h: 1254 },
    tile: { src: "/venues/tiles/viscosity.jpg", bg: "#000000" },
    confirmed: true,
  },
  {
    name: "Warehouse 25",
    slug: "warehouse-25",
    suburb: "Bowen Hills",
    logo: { src: "/venues/warehouse-25.jpg", w: 447, h: 447 },
    tile: { src: "/venues/tiles/warehouse-25.png", bg: "#081b17" },
    confirmed: true,
  },
  {
    name: "Brookfield General Store",
    slug: "brookfield-general-store",
    suburb: "Brookfield",
    logo: { src: "/venues/brookfield-general-store.png", w: 640, h: 439 },
    tile: { src: "/venues/tiles/brookfield-general-store.png", bg: "#ffffff" },
    confirmed: true,
  },
];

// The only venues that may appear anywhere user-facing.
export const publicVenues: Venue[] = venues.filter((v) => v.confirmed);
