import { gql } from '@apollo/client';

export const GET_WOMEN_CATEGORY_PRODUCTS = gql`
  query GetWomenCategoryProducts {
    categoryList(filters: { url_key: { eq: "women" } }) {
      uid
      name
      products {
        items {
          uid
          name
          sku
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
