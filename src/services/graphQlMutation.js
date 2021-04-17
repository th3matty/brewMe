import {
    graphQl_Uri,
    getUserList,
    getUserListByCount,
  } from "../services/graphQlQueries";
  
  export const SearchForSingleUser = async (userName, token) => {
    const getAllUserList = getUserList(userName);
  
    try {
      const searchUserName = await fetch(graphQl_Uri, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(getAllUserList),
      });
      const searchResult = await searchUserName.json();
      console.log("searchResult:", searchResult);
  
      if (!searchResult) {
        throw new Error("Something went wrong");
      }
  
      if (searchResult.data.getUserList.length === 0) {
        const message = "\u274C woops, no user found \u274C";
        return message;
      } else {
        const user = searchResult.data.getUserList[0];
        return user;
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  export const GetUserList = async (count, token) => {
    const getAllUserList = getUserListByCount(count);
  
    try {
      const userList = await fetch(graphQl_Uri, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(getAllUserList),
      });
      const resultUserList = await userList.json();
      console.info(resultUserList);
  
      if (!resultUserList) {
        throw new Error("Something went wrong");
      }
  
      const listOfUser = await resultUserList.data.getUserList;
  
      const reverseListOfUser = await listOfUser.reverse().slice(0,10)
      console.log("reverseListOfUser:", reverseListOfUser);
  
      return reverseListOfUser
  
    } catch (err) {
      console.log(err);
    }
  };
  
