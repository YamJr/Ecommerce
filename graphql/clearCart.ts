import {gql} from '@apollo/client';
export const CLEAR_CART_ITEMS = gql`
  mutation clearCart($uid: String!) {
    clearCart(input: {uid: $uid}) {
      cart {
        id
        itemsV2 {
          items {
            uid
          }
        }
      }
      errors {
        message
      }
    }
  }
`
