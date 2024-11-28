import { gql } from '@apollo/client';

export const GET_MEN_CATEGORY_PRODUCTS = gql`
  query GetMenCategoryProducts {
    categoryList(filters: { url_key: { eq: "men" } }) {
      uid
      name
      url_key
      products {
        items {
          uid
          name
          url_key
           price_range {
          minimum_price {
            final_price {
              value
              currency
            }
          }
        }
          image {
            url
          }
        }
      }
    }
  }
`;
