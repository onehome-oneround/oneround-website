/*
  Partner venues — shared by the home logo slider and the /partnered-venues page.
  `logo` carries intrinsic dimensions so it can be normalised to a consistent
  height (width auto) without distortion.

  Only venues that have confirmed being named publicly are shown. Everything else
  stays in this list, assets and all, but must render NOWHERE until it confirms:
  always read `publicVenues` (below), never `venues`, from anything user-facing.
*/

export type Venue = {
  name: string;
  slug: string;
  suburb: string;
  // `invert` flips a dark/transparent logo to white on navy.
  // `screen` blends a logo with a baked-in black background onto navy (drops the black).
  logo: { src: string; w: number; h: number; invert?: boolean; screen?: boolean };
  // Has the venue confirmed we can name them publicly? Gates all display.
  confirmed?: boolean;
};

export const venues: Venue[] = [
  {
    name: "Brookfield General Store",
    slug: "brookfield-general-store",
    suburb: "Brookfield",
    logo: { src: "/venues/brookfield-general-store.png", w: 1000, h: 500 },
    confirmed: true,
  },
  {
    name: "Eclipse",
    slug: "eclipse",
    suburb: "[?]",
    logo: { src: "/venues/eclipse.png", w: 1000, h: 500 },
    confirmed: true,
  },
  {
    name: "Johnny Ringo's",
    slug: "johnny-ringos",
    suburb: "Fortitude Valley",
    logo: { src: "/venues/johnny-ringos.png", w: 1000, h: 500 },
    confirmed: true,
  },
  {
    name: "Last Man Standing",
    slug: "last-man-standing",
    suburb: "[?]",
    logo: { src: "/venues/last-man-standing.png", w: 1000, h: 500 },
    confirmed: true,
  },
  {
    name: "Pawn & Co.",
    slug: "pawn-and-co",
    suburb: "[?]",
    logo: { src: "/venues/pawn-and-co.png", w: 1000, h: 500 },
    confirmed: true,
  },
  {
    name: "Pig N Whistle Brunswick Street",
    slug: "pig-n-whistle-brunswick-street",
    suburb: "Fortitude Valley",
    logo: { src: "/venues/pig-n-whistle-brunswick-street.png", w: 1000, h: 500 },
    confirmed: true,
  },
  {
    name: "Pig N Whistle South Bank",
    slug: "pig-n-whistle-south-bank",
    suburb: "South Bank",
    logo: { src: "/venues/pig-n-whistle-south-bank.png", w: 1000, h: 500 },
    confirmed: true,
  },
  {
    name: "Pop World Nightclub",
    slug: "pop-world-nightclub",
    suburb: "Fortitude Valley",
    logo: { src: "/venues/pop-world-nightclub.png", w: 1000, h: 500 },
    confirmed: true,
  },
  {
    name: "Sugar Nightclub",
    slug: "sugar-nightclub",
    suburb: "Fortitude Valley",
    logo: { src: "/venues/sugar-nightclub.png", w: 1000, h: 500 },
    confirmed: true,
  },
  {
    name: "The Magee",
    slug: "the-magee",
    suburb: "[?]",
    logo: { src: "/venues/the-magee.png", w: 1000, h: 500 },
    confirmed: true,
  },
  {
    name: "The Normanby",
    slug: "the-normanby",
    suburb: "Paddington",
    logo: { src: "/venues/the-normanby.png", w: 1000, h: 500 },
    confirmed: true,
  },
  {
    name: "Viscosity",
    slug: "viscosity",
    suburb: "CBD",
    logo: { src: "/venues/viscosity.png", w: 1000, h: 500 },
    confirmed: true,
  },
  {
    name: "Warehouse 25",
    slug: "warehouse-25",
    suburb: "[?]",
    logo: { src: "/venues/warehouse-25.png", w: 1000, h: 500 },
    confirmed: true,
  },
];

// The only venues that may appear anywhere user-facing.
export const publicVenues: Venue[] = venues.filter((v) => v.confirmed);
