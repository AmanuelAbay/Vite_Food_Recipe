import gql from 'graphql-tag';

const EDIT_FOOD = gql `
mutation update_food($id:Int, $category:String!, $description: String!, $duration: String!, $title: String!) {
update_foods(
where: {id: {_eq:$id}},_set: { category:$category, description:$description, duration:$duration, title:$title,
}){
  returning{
    id
  }
}
}
`
export default EDIT_FOOD;