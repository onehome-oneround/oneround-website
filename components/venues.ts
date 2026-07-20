/*
  Partner venues — shared by the home logo slider and the /partnered-venues page.
  `logo` carries intrinsic dimensions so it can be normalised to a consistent
  height (width auto) without distortion. `photo` is the venue's card header.

  Only venues that have confirmed being named publicly are shown. Everything else
  stays in this list, assets and all, but must render NOWHERE until it confirms:
  always read `publicVenues` (below), never `venues`, from anything user-facing.
*/

export type Venue = {
  name: string;
  slug: string;
  // `invert` flips a dark/transparent logo to white on navy.
  // `screen` blends a logo with a baked-in black background onto navy (drops the black).
  logo: { src: string; w: number; h: number; invert?: boolean; screen?: boolean };
  photo: string;
  // Has the venue confirmed we can name them publicly? Gates all display.
  confirmed?: boolean;
};

export const venues: Venue[] = [
  {
    name: "The Normanby",
    slug: "the-normanby",
    logo: { src: "/images/logo-normanby.png", w: 3750, h: 1969, invert: true },
    photo: "/images/venue-normanby.jpg",
    confirmed: true,
  },
  {
    name: "The Magee",
    slug: "the-magee",
    logo: { src: "/images/logo-magee.png", w: 1466, h: 818 },
    photo: "/images/venue-magee.jpg",
    confirmed: true,
  },
  // Mi Casa and Spice Nightlife have not confirmed public naming, so they carry no
  // `confirmed` flag and are held out of `publicVenues`. Add the flag once they do.
  {
    name: "Mi Casa",
    slug: "mi-casa",
    logo: { src: "/images/logo-micasa-t.png", w: 3750, h: 1969 },
    photo: "/images/venue-micasa.jpg",
  },
  {
    name: "Sugar Nightlife",
    slug: "sugar-nightlife",
    logo: { src: "/images/logo-sugar.png", w: 512, h: 512 },
    photo: "/images/venue-sugar.png",
    confirmed: true,
  },
  {
    name: "Spice Nightlife",
    slug: "spice-nightlife",
    logo: { src: "/images/logo-spice.png", w: 3375, h: 4219 },
    photo: "/images/venue-spice.jpg",
  },
];

// The only venues that may appear anywhere user-facing.
export const publicVenues: Venue[] = venues.filter((v) => v.confirmed);
