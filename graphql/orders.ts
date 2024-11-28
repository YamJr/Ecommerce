import { gql } from '@apollo/client';

export const GET_ORDER_HISTORY = gql`
  query {
    customer {
      orders {
        items {
          order_number
          id
          created_at
          status
          items {
            id
            quantity_ordered
            product {
              name
              url_key
              sku
              price_range {
                maximum_price {
                  final_price {
                    currency
                    value
                  }
                }
              }
              image {
                url
              }
            }
          }
          total {
            grand_total {
              currency
              value
            }
          }
        }
      }
    }
  }
`;
