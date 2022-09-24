import gql from 'graphql-tag';

const COMMENT = gql `
mutation comment($food_id:Int!, $user_id:Int!, $comment:String!) {
    insert_comments(objects: {comment_user_id: $user_id, food_id: $food_id, comment:$comment}){
    returning{
      id
    }
  }
}
`
export default COMMENT;