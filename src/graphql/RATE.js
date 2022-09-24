import gql from 'graphql-tag';

const RATE = gql `
mutation rate($user_id: Int!, $food_id: Int!, $value:Int!) {
  insert_rate(objects: {food_id: $food_id, rate_user_id: $user_id,value:$value}) {
    returning {
      id
    }
  }
}
`
export default RATE;