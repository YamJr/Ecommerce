import { gql } from '@apollo/client';

export const GET_CART_DETAILS = gql`
  query GetCartDetails($cartId: String!) {
    cart(cart_id: $cartId) {
      itemsV2 {
        items {
          uid
          quantity
          product {
            name
            sku
            url_key
            image {
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
          }
        }
      }
    }
  }
`;
