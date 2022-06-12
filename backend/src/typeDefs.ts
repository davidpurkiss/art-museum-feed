import { gql } from 'apollo-server';

const typeDefs = gql`
  type Person {
    displayname: String
    role: String
    birthplace: String
    displaydate: String
    culture: String
    gender: String
  }

  type Image {
    date: String
    copyright: String
    baseimageurl: String
    width: Int
    height: Int
    format: String
  }

  type Object {
    title: String
    technique: String
    date: String
    century: String
    culture: String
    url: String
    people: [Person]
    images: [Image]
  }

  type Query {
    objects(size: Int, page: Int): [Object]
  }
`;

export default typeDefs;
