import {gql} from '@apollo/client'

export const BILLING_ADDRESSES = gql`
mutation SetBillingAddress($cartId: String!, $billingAddress: CartAddressInput!, $sameAsShipping: Boolean!) {
  setBillingAddressOnCart(
    input: {
      cart_id: $cartId
      billing_address: {
        address: $billingAddress
        same_as_shipping: $sameAsShipping
      }
    }
  ) {
    cart {
      billing_address {
        firstname
        lastname
        city
      }
    }
  }
}
`