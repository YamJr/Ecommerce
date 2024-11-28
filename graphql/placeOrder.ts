import {gql} from '@apollo/client';
export const PLACE_ORDER = gql`
mutation PlaceOrder($cartId: String!) {
  placeOrder(input: { cart_id: $cartId }) {
    orderV2 {
      number
      token
    }
    errors {
      message
      code
    }
  }
}
`;
