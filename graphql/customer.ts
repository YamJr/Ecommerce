 import { gql } from '@apollo/client';

  export const GET_CUSTOMER_INFO = gql`
    {
      customer {
        firstname
        lastname
        email
        addresses {
          id
          firstname
          lastname
          street
          city
          region {
            region_id
            region
            region_code
          }
          postcode
          country_code
          telephone
          default_shipping
          default_billing
        }
      }
    }
  `;

  //update query for customer 
  export const UPDATE_CUSTOMER_INFO = gql`
  mutation UpdateCustomer($input: CustomerInput!) {
    updateCustomer(input: $input) {
      customer {
        id
        firstname
        lastname
        email
      }
    }
  }
`;
