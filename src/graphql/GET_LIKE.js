import gql from 'graphql-tag';
// const gql = require('graphql-tag')

const GET_LIKE = gql `
query get_like($food_id:Int!, $user_id:Int!) {
  likes(where: {food_id: {_eq: $food_id}, like_user_id: {_eq: $user_id}}) {
    id
  }
}
`
export default GET_LIKE;