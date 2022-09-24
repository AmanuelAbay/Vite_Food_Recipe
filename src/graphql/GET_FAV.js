import gql from 'graphql-tag';

const GET_FAV = gql `
query favorites($food_id:Int!, $user_id:Int!) {
  favorites(where: {favorite_user_id: {_eq: $user_id}, food_id: {_eq: $food_id}}){
    id
  }
}
`
export default GET_FAV;