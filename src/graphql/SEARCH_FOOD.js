import gql from 'graphql-tag'

const SEARCH_FOOD = gql `
query search($search_key:String!) {
    foods(where: {title: {_regex: $search_key}}){
    id
    title
    description
    category
    duration
    user{
      id
      name
    }
    ingredients{
      id
      name
      amount
    }
    steps{
      id
      description
      step_number
    }
    comments {
      id
      user{
        id
        name
      }
      comment
    }
    likes{
      id
    }
    rates {
      rate_user_id
      value
    }
    favorites{
      favorite_user_id
    }
    images{
      path
    }
  }
}
`
export default SEARCH_FOOD