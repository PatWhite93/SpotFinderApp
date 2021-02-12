import { gql } from '@apollo/client';

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export const FETCH_SPOTS_QUERY = gql`
  {
    getSpots {
      id
      body
      longitude
      latitude
      description
      bustability
      username
    }
  }
`;
