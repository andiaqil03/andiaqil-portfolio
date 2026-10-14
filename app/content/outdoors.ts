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
  intro: 'When I’m not coding, I like to go hiking, travel and play sport.',
  interests: ['Hiking', 'Travel', 'Sport'] as OutdoorKind[],
  photos: [
    {
      id: 'hike-1',
      kind: 'Hiking',
      caption: todo('Caption: which trail or peak?'),
      image: todo('Hiking photo (landscape, ~1600px wide)'),
    },
    {
      id: 'travel-1',
      kind: 'Travel',
      caption: todo('Caption: where was this?'),
      image: todo('Travel photo'),
    },
    {
      id: 'sport-1',
      kind: 'Sport',
      caption: todo('Caption: which sport?'),
      image: todo('Sport photo'),
    },
    {
      id: 'hike-2',
      kind: 'Hiking',
      caption: todo('Caption'),
      image: todo('Another hiking photo (optional)'),
    },
    {
      id: 'travel-2',
      kind: 'Travel',
      caption: todo('Caption'),
      image: todo('Another travel photo (optional)'),
    },
    {
      id: 'sport-2',
      kind: 'Sport',
      caption: todo('Caption'),
      image: todo('Another sport photo (optional)'),
    },
  ] satisfies OutdoorPhoto[],
};
