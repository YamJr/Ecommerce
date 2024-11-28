import {gql} from '@apollo/client'
export const UPDATE_CART_ITEMS = gql`
mutation UpdateCartItems($cartId: String!, $cartItemUid: ID!, $quantity: Float!) {
  updateCartItems(
    input: {
      cart_id: $cartId,
      cart_items: [
        {
          cart_item_uid: $cartItemUid,
          quantity: $quantity
        }
      ]
    }
  ) {
    cart {
      itemsV2 {
        items {
          uid
          product {
            name
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