import gql from 'graphql-tag';

const CURRENT_USER = gql `
query ($id: Int!) {
  users(where: { id: { _eq: $id } }) {
    id
    name
    email
    phone_number
    password
  }
}
`
export default CURRENT_USER;