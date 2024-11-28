import {gql} from '@apollo/client';
 export const getGuestCart = gql`
   mutation {
    createGuestCart{
        cart {
            id
        }
    }
}
 `
