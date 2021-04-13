export const graphQl_Uri = "http://localhost:3000/graphql";

export const createUserMethodGraphQl = (
  userName,
  password,
  emailAddress,
  confirmPassword
) => {
  return {
    query: `mutation CreateNewUser($username:String!,$password:String!,$confirmPassword:String!,$emailAddress:String!){
            createUser(createUserInput:{
              username:$username
              password:$password
              emailAddress:$emailAddress
              confirmPassword:$confirmPassword
            })
          }`,
    variables: {
      username: userName,
      password: password,
      emailAddress: emailAddress,
      confirmPassword: confirmPassword,
    },
  };
};

export const userLoginMethodGraphQl = (userName, password) => {
  return {
    query: `mutation UserLogin($username:String!, $password:String!){
            login(username: $username, password: $password){
              token,
              refreshToken
            }
          }`,
    variables: {
      username: userName,
      password: password,
    },
  };
};

export const queryGetUserDetails = () => {
  return {
    query: `query GetUserDetails{
            getUserDetails{
              _id,
              username,
              emailAddress,
              followers,
              following,
              createdAt,
              updatedAt
            }
          }`,
  };
};

export const getRefreshTokenMethodGraphQL = (refreshToken) => {
  return {
    query: `mutation GetRefreshToken($refreshToken:String!){
      refreshToken(refreshToken: $refreshToken){
        token,
        refreshToken
      }
    }`,
    variables: {
      refreshToken: refreshToken,
    },
  };
};

export const getUserList = (filterByName) =>{
  return {
    query: `query GetUserList($filterByName:String!){
      getUserList(filterByName: $filterByName){
        _id,
        username
      }
    }`,
    variables: {
      filterByName: filterByName
    }
  }
}
