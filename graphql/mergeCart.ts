import { gql } from '@apollo/client';

export const MERGE_CARTS = gql`
  mutation MergeCarts($sourceCartId: String!, $destinationCartId: String!) {
    mergeCarts(
      source_cart_id: $sourceCartId
      destination_cart_id: $destinationCartId
    ) {
      itemsV2 {
        items {
          id
          product {
            name
            url_key
            sku
          }
          quantity
        }
        total_count
        page_info {
          page_size
          current_page
          total_pages
        }
      }
    }
  }
`;
