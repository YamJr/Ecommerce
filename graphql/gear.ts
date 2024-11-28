import { gql } from '@apollo/client';

export const GET_GEAR_CATEGORY_PRODUCTS = gql`
  query GetGearCategoryProducts {
    categoryList(filters: { url_key: { eq: "gear" } }) {
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
