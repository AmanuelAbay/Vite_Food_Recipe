import gql from 'graphql-tag';

const STEPS = gql `
query steps_order($food_id:Int!) {
  steps(where: {food_id: {_eq: $food_id}}, order_by: {step_number: asc}) {
    id
    description
    step_number
  }
}
`
export default STEPS;