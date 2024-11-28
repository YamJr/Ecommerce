import { gql } from '@apollo/client';

export const GET_PRODUCT_DETAILS = gql`
  query GetProductDetails($url_key: String!) {
    products(filter: { url_key: { eq: $url_key } }) {
      items {
        uid
        name
        sku
        url_key
        stock_status
        image {
          label
          url
        }
        description {
          html
        }
        media_gallery {
          label
          url
        }
        price_range {
          minimum_price {
            final_price {
              value
              currency
            }
          }
        }
        review_count
        reviews {
          items {
            average_rating
            created_at
            nickname
            summary
            text
          }
        }
        related_products {
          name
          thumbnail {
            label
            url
          }
          sku
          price_range {
            minimum_price {
              final_price {
                value
                currency
              }
              regular_price {
                value
                currency
              }
            }
          }
        }
      }
      total_count
    }
  }
`;
