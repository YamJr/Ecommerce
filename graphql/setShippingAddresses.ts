import { gql } from '@apollo/client';

export const SHIPPING_ADDRESSES = gql`
mutation SetShippingAddress($cartId: String!, $shippingAddress: CartAddressInput!) { 
  setShippingAddressesOnCart(
    input: {
      cart_id: $cartId
      shipping_addresses: [
        {
          address: $shippingAddress
        }
      ]
    }
  ) {
    cart {
      shipping_addresses {
        firstname
        middlename
        lastname
        prefix
        suffix
        company
        street
        city
        region {
          code
          label
        }
        postcode
        telephone
        fax
        country {
          code
          label
        }
      }
    }
  }
}
`