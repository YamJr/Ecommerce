import {gql} from '@apollo/client'

export const searchProductByName = gql`
query searchProductsByName($name: String!) {
  products(
    filter: {
      name: {
        match: $name
      }
    }
  ) {
    items {
      id
      sku
      name
      url_key
      price_range {
              minimum_price {
                final_price {
                  value
                  currency
                }
              }
            }
      image {
        url
        label
      }
    }
    total_count
    page_info {
      current_page
      page_size
    }
  }
}
`