import gql from 'graphql-tag';

const UNFAVORITE = gql `
mutation UNFAV($food_id: Int!) {
  delete_favorites(where: {food_id: {_eq: $food_id} }) {
    returning {
      id
    }
  }
}
`
export default UNFAVORITE;