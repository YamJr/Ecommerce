import {gql } from '@apollo/client';
export const REMOVE_FROM_CART = gql`
mutation RemoveItemFromCart($cartId: String!, $cartItemUid: ID!) {
    removeItemFromCart(
      input: {
        cart_id: $cartId,
        cart_item_uid: $cartItemUid
      }
    ) {
      cart {
        itemsV2 {
          items {
            uid
            product {
              name
              sku
            }
            quantity
          }
          total_count
          page_info {
            page_size
            current_page
            total_pages
          }
        }
        prices {
          grand_total {
            value
            currency
          }
        }
      }
    }
  }
  `