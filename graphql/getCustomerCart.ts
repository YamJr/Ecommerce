import { gql } from '@apollo/client';

export const GET_CUSTOMER_CART = gql`
  query GetCustomerCart {
    customerCart {
      id
      total_quantity
      available_payment_methods {
        code
        title
      }
      billing_address {
        city
        country {
          code
          label
        }
        firstname
        lastname
        postcode
        region {
          code
          label
        }
        street
        telephone
      }
      shipping_addresses {
        firstname
        lastname
        street
        city
        region {
          code
          label
        }
        country {
          code
          label
        }
        telephone
        available_shipping_methods {
          amount {
            currency
            value
          }
          carrier_code
          carrier_title
          method_code
          method_title
        }
        selected_shipping_method {
          amount {
            value
            currency
          }
          carrier_code
          carrier_title
          method_code
          method_title
        }
      }
      itemsV2(currentPage: 1, pageSize: 20) {
        total_count
        items {
          id
          uid
          product {
            name
            sku
            url_key
            price_range {
              maximum_price {
                final_price {
                  currency
                  value
                }
              }
              minimum_price {
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
          quantity
        }
        page_info {
          page_size
          current_page
          total_pages
        }
      }
      selected_payment_method {
        code
        title
      }
      prices {
        grand_total {
          value
          currency
        }
        subtotal_excluding_tax {
          value
          currency
        }
        subtotal_including_tax {
          value
          currency
        }
        subtotal_with_discount_excluding_tax {
          value
          currency
        }
      }
    }
  }
`;
