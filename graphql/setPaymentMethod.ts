import { gql } from '@apollo/client';

export const PAYMENT_METHOD = gql`
mutation SetPaymentMethodOnCart($cartId: String!, $paymentMethodCode: String!) {
  setPaymentMethodOnCart(
    input: {
      cart_id: $cartId
      payment_method: {
        code: $paymentMethodCode
      }
    }
  ) {
    cart {
      selected_payment_method {
        code
        title
      }
    }
  }
}
`;
