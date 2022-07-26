import { getReducedRelease } from '../dataStructure';

test('add release1 to releases for use in dynamic page', () => {
  const releaseWithTrackData = [
    {
      id: 55,
      releaseName: 'Closer      ',
      tracks: 2,
      releaseDate: '2022/04/21',
      recordLabel: 'Code Recordings',
      coverArtLink:
        'https://res.cloudinary.com/dfmmykkmb/image/upload/v1658217256/locoda-uploads/infhmbzud9lnhmtjea8f.jpg',
      buyLink: 'https://www.beatport.com/release/closer/3708354',
      streamingLink: 'https://ingrv.es/closer-bek-3',
      bandcampLink:
        'https://coderecs.bandcamp.com/album/closer-closer-instrumental',
      trackNumber: 1,
      trackName: 'Closer',
      contributingArtists: 'Tricia McTeague',
      releaseId: 1,
      trackLength: '5:08',
    },
    {
      id: 56,
      releaseName: 'Closer      ',
      tracks: 2,
      releaseDate: '2022/04/21',
      recordLabel: 'Code Recordings',
      coverArtLink:
        'https://res.cloudinary.com/dfmmykkmb/image/upload/v1658217256/locoda-uploads/infhmbzud9lnhmtjea8f.jpg',
      buyLink: 'https://www.beatport.com/release/closer/3708354',
      streamingLink: 'https://ingrv.es/closer-bek-3',
      bandcampLink:
        'https://coderecs.bandcamp.com/album/closer-closer-instrumental',
      trackNumber: 2,
      trackName: 'Closer (Instrumental)',
      contributingArtists: '',
      releaseId: 1,
      trackLength: '5:08',
    },
  ];

  expect(getReducedRelease(releaseWithTrackData)).toStrictEqual({
    id: 55,
    releaseName: 'Closer      ',
    tracks: 2,
    releaseDate: '2022/04/21',
    recordLabel: 'Code Recordings',
    coverArtLink:
      'https://res.cloudinary.com/dfmmykkmb/image/upload/v1658217256/locoda-uploads/infhmbzud9lnhmtjea8f.jpg',
    buyLink: 'https://www.beatport.com/release/closer/3708354',
    streamingLink: 'https://ingrv.es/closer-bek-3',
    bandcampLink:
      'https://coderecs.bandcamp.com/album/closer-closer-instrumental',
    trackData: [
      {
        id: 1,
        trackName: 'Closer',
        colab: 'Tricia McTeague',
        trackLength: '5:08',
        trackNumber: 1,
        releaseId: 1,
      },
      {
        id: 1,
        trackName: 'Closer (Instrumental)',
        colab: '',
        trackLength: '5:08',
        trackNumber: 2,
        releaseId: 1,
      },
    ],
  });
});
