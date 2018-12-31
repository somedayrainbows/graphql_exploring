const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

//hardcoded data for now
const customers = [
  {id: "1", name: "Jane Doe", email: "jdoe@gmail.com", age: 41},
  {id: "2", name: "Leah Doe", email: "ldoe@gmail.com", age: 38},
  {id: "3", name: "Dave Doe", email: "ddoe@gmail.com", age: 35},
  {id: "4", name: "Marsha Doe", email: "mdoe@gmail.com", age: 68}
]

//customer type
const CustomerType = new GraphQLObjectType({
  name:"Customer",
  fields:() => ({
    id: {type:GraphQLString},
    name: {type:GraphQLString},
    email: {type:GraphQLString},
    age: {type:GraphQLInt},
  })
});

//root query
const RootQuery = new GraphQLObjectType({
  name:'RootQueryType',
  fields:{
    customer:{
      type:CustomerType,
      args:{
        id:{type:GraphQLString}
      },
      resolve(parentValue, args){
        for(let i = 0;i < customers.length;i++){
          if(customers[i].id == args.id) {
            return customers[i]
          }
        }
      }
    },
    customers:{
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args){
        return customers
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
});
