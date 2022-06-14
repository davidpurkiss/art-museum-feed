import { MockedResponse } from '@apollo/client/testing';
import { ArtFeedQuery } from '../../../types/ArtFeedItem';

const mocks: Array<MockedResponse> = [
  {
    request: {
      query: ArtFeedQuery,
      variables: {
        size: 10,
        page: 1,
      },
    },
    result: {
      data: {
        objects: {
          records: [
            {
              title: 'Charles Erskine',
              technique: 'Mezzotint',
              century: '18th century',
              dated: '1737',
              culture: 'British',
              people: [
                {
                  displayname: 'James McArdell',
                  role: 'Artist',
                  birthplace: null,
                  displaydate: 'c. 1729 - 1765',
                  culture: 'British',
                  gender: 'male',
                },
              ],
              images: [
                {
                  date: '2006-02-10',
                  baseimageurl:
                    'https://nrs.harvard.edu/urn-3:HUAM:INV034167_dynmc',
                },
              ],
            },
          ],
          info: {
            pages: 5,
          },
        },
      },
    },
  },
  {
    request: {
      query: ArtFeedQuery,
      variables: {
        size: 10,
        page: 2,
      },
    },
    result: {
      data: {
        objects: {
          records: [
            {
              title: 'The Bible in Pictures',
              technique: 'Wood engraving',
              century: '19th century',
              dated: '1858',
              culture: 'German',
              people: [
                {
                  displayname: 'After Julius Schnorr von Carolsfeld',
                  role: 'Artist',
                  birthplace: null,
                  displaydate: '1794 - 1872',
                  culture: 'German',
                  gender: 'unknown',
                },
              ],
              images: [
                {
                  date: '2009-04-01',
                  baseimageurl:
                    'https://nrs.harvard.edu/urn-3:HUAM:INV208057_dynmc',
                },
                {
                  date: '2009-04-01',
                  baseimageurl:
                    'https://nrs.harvard.edu/urn-3:HUAM:INV208056_dynmc',
                },
              ],
            },
          ],
          info: {
            pages: 5,
          },
        },
      },
    },
  },
  {
    request: {
      query: ArtFeedQuery,
      variables: {
        size: 10,
        page: 3,
      },
    },
    error: new Error('An error occurred'),
  },
];

export default mocks;
