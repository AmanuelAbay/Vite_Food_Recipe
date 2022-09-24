import gql from 'graphql-tag';

const GET_IMAGES = gql `
query getImages($food_id:Int!) {
  images(where: {food_id: {_eq: $food_id}}) {
    path
  }
}
`
export default GET_IMAGES;