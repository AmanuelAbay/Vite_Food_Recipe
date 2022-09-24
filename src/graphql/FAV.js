import gql from 'graphql-tag';

const FAV = gql `
mutation FAV($food_id: Int!) {
  insert_favorites(objects: {food_id: $food_id}) {
    returning {
      id
    }
  }
}
`
export default FAV;