import { gql } from '@apollo/client';

export const SHIPPING_METHODS = gql`
mutation SetShippingMethodsOnCart($cartId: String!, $shippingMethods: [ShippingMethodInput!]!) {
  setShippingMethodsOnCart(
    input: {
      cart_id: $cartId
      shipping_methods: $shippingMethods
    }
  ) {
    cart {
      shipping_addresses {
        selected_shipping_method {
          carrier_code
          carrier_title
          method_code
          method_title
          amount {
            value
            currency
          }
        }
      }
    }
  }
}
`;
