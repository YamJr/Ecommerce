import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      items {
        uid
        url_key
        name
        children {
          uid
          url_key
          name
          children {
            uid
            url_key
            name
          }
        }
      }
    }
  }
`;
