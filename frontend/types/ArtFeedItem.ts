import gql from 'graphql-tag';

export interface ArtFeedItem {
  title: string;
  technique: string;
  dated: string;
  century: string;
  culture: string;
  people: Array<{
    displayname: string;
    displaydate: string;
    role: string;
  }>;
  images: Array<{
    baseimageurl: string;
  }>;
}

export const ArtFeedQuery = gql`
  query ArtFeedQuery($size: Int, $page: Int) {
    objects(size: $size, page: $page) {
      info {
        pages
      }
      records {
        title
        technique
        century
        dated
        culture
        people {
          role
          displaydate
          displayname
        }
        images {
          baseimageurl
          date
        }
      }
    }
  }
`;
