import { todo, type MaybePlaceholder } from './placeholder';
import type { YearMonth } from './types';

export type OutdoorKind = 'Hiking' | 'Travel' | 'Sport';

export interface OutdoorPhoto {
  /** Under public/images/outdoors/. */
  src: string;
  alt: string;
  width: number;
  height: number;
}

/** One card in the "Off the trail" section: a trip, hike or event, with its photos in order. */
export interface OutdoorActivity {
  id: string;
  kind: OutdoorKind;
  title: MaybePlaceholder<string>;
  /** e.g. the route or the place. */
  detail?: MaybePlaceholder<string>;
  date?: YearMonth;
  photos: MaybePlaceholder<OutdoorPhoto[]>;
}

const merbabu = (n: number, alt: string, width = 960): OutdoorPhoto => ({
  src: `/images/outdoors/merbabu-${n}.jpg`,
  alt,
  width,
  height: 1280,
});

export const outdoors = {
  intro: 'Life outside work: hiking, travel and sport.',
  interests: ['Hiking', 'Travel', 'Sport'] as OutdoorKind[],
  activities: [
    {
      id: 'merbabu',
      kind: 'Hiking',
      title: 'Gunung Merbabu',
      detail: 'via Suwanting',
      date: '2026-05',
      photos: [
        merbabu(
          1,
          'Andi leaning against a tree with red-tipped leaves on a grassy mountainside',
          961,
        ),
        merbabu(2, 'A smoking volcano rising above a sea of clouds at dusk, seen from the trail'),
        merbabu(3, 'Andi with a trekking pole above a sea of clouds at sunrise'),
        merbabu(4, 'Andi at the Kenteng Songo summit sign, 3,122 m, Gunung Merbabu National Park'),
        merbabu(5, 'Green ridgelines dropping away into cloud below the trail'),
        merbabu(6, 'Andi by a weathered tree trunk, with a green peak and clouds behind'),
        merbabu(7, 'Andi resting on a low branch of a tree on a grassy slope above the clouds'),
        merbabu(8, 'Andi relaxing against a tree trunk among red flowers on a misty slope'),
        merbabu(9, 'Andi and two fellow hikers on a grassy ridge trail, clouds behind', 853),
      ],
    },
    {
      id: 'travel-1',
      kind: 'Travel',
      title: todo('Travel: where did you go?'),
      detail: todo('Travel: city or country'),
      photos: todo('Travel photos (portrait 3:4, ~960×1280), in order'),
    },
    {
      id: 'sport-1',
      kind: 'Sport',
      title: todo('Sport: which sport, team or event?'),
      photos: todo('Sport photos (portrait 3:4, ~960×1280), in order'),
    },
  ] satisfies OutdoorActivity[],
};
