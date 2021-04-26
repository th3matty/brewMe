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
              updatedAt,
              settings{
                avatarURI,
                description,
                darkmode,
              }
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

export const getUserList = (filterByName) => {
  return {
    query: `query GetUserList($filterByName:String!){
      getUserList(filterByName: $filterByName){
        _id,
        username,
        avatarURI,
      }
    }`,
    variables: {
      filterByName: filterByName,
    },
  };
};

export const getUserListByCount = (count) => {
  return {
    query: `query GetUserList($count:Int!){
      getUserList(count: $count){
        _id,
        username,
        avatarURI,
      }
    }`,
    variables: {
      count: count,
    },
  };
};

export const setUserAvatar = (avatarURI) => {
  return {
    query: `mutation SetUserSettings($avatarURI:String){
      setUserSettings(inputSettings:{
        avatarURI:$avatarURI
      }){
        _id,
        username,
        emailAddress,
        followers,
        following
        settings{
          avatarURI,
          description
        }
      }
    }`,
    variables: {
      avatarURI: avatarURI,
    },
  };
};

export const setUserDescription = (description) => {
  return {
    query: `mutation SetUserSettings($description:String){
      setUserSettings(inputSettings:{
        description:$description
      }){
        _id,
        username,
        emailAddress,
        followers,
        following
        settings{
          avatarURI,
          description
        }
      }
    }`,
    variables: {
      description: description,
    },
  };
};

export const followUser = (followUserID) => {
  return {
    query: `mutation FollowUser($followUserID:ID!){
      followUser(followUserID: $followUserID)
    }`,
    variables: {
      followUserID: followUserID,
    },
  };
};

export const addUserToFavourite = (favouriteID) => {
  return {
    query: `mutation AddUserToFavourites($favouriteID:ID!){
      addUserToFavourites(favouriteID:$favouriteID)
    }`,
    variables: {
      favouriteID: favouriteID,
    },
  };
};
