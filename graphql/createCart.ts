import { gql } from '@apollo/client';

export const CREATE_CART = gql`
  mutation CreateEmptyCart {
    createEmptyCart
  }
`;
