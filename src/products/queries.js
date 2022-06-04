import { gql } from '@apollo/client';
const GET_PRODUCTS = gql`
  query getProducts {
    getProducts {
      id
      name
      stock
      price
    }
  }
`;
export default GET_PRODUCTS;
