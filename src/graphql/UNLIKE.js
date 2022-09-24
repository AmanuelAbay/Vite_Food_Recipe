import gql from "graphql-tag";

const UNLIKE = gql`
  mutation unlike($food_id: Int!) {
    delete_likes(where: { food_id: { _eq: $food_id } }) {
      returning {
        id
      }
    }
  }
`;
export default UNLIKE;
