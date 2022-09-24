import gql from 'graphql-tag';

const DELETE_STEP = gql `
mutation delete_steps($id:Int!) {
  delete_steps(where: {id: {_eq: $id}}) {
    returning {
      id
    }
  }
}
`
export default DELETE_STEP;