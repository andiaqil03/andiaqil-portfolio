import { todo, type MaybePlaceholder } from './placeholder';

export type OutdoorKind = 'Hiking' | 'Travel' | 'Sport';

export interface OutdoorPhoto {
  id: string;
  kind: OutdoorKind;
  /** e.g. the trail, peak, city or sport. */
  caption: MaybePlaceholder<string>;
  /** Put the image in public/images/outdoors/ and fill in its details. */
  image: MaybePlaceholder<{ src: string; alt: string; width: number; height: number }>;
}

export const outdoors = {
  intro: 'Life outside work: hiking, travel and sport.',
  interests: ['Hiking', 'Travel', 'Sport'] as OutdoorKind[],
  photos: [
    {
      id: 'hike-1',
      kind: 'Hiking',
      caption: todo('Hiking activity: which trail or peak, and when?'),
      image: todo('Hiking photo (landscape, ~1600px wide)'),
    },
    {
      id: 'travel-1',
      kind: 'Travel',
      caption: todo('Travel activity: where, and when?'),
      image: todo('Travel photo'),
    },
    {
      id: 'sport-1',
      kind: 'Sport',
      caption: todo('Sport activity: which sport, team or event?'),
      image: todo('Sport photo'),
    },
    {
      id: 'hike-2',
      kind: 'Hiking',
      caption: todo('Another hiking activity (optional)'),
      image: todo('Hiking photo (optional)'),
    },
    {
      id: 'travel-2',
      kind: 'Travel',
      caption: todo('Another trip (optional)'),
      image: todo('Travel photo (optional)'),
    },
    {
      id: 'sport-2',
      kind: 'Sport',
      caption: todo('Another sport activity (optional)'),
      image: todo('Sport photo (optional)'),
    },
  ] satisfies OutdoorPhoto[],
};
