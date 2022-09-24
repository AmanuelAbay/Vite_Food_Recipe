// const gql = require('graphql-tag');
import gql from 'graphql-tag';
export default gql `
query ($id: String!) {
  users(where: { id: { _eq: $id } }) {
    id
    name
    email
    phone_number
    password
  }
}
`