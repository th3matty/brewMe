import { graphQl_Uri, getUserList } from "../services/graphQlQueries";

const SearchForUser = async (userName, token) => {
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
      const user = searchResult.data.getUserList[0].username;
      return user;
    }
  } catch (err) {
    console.log(err);
  }
};

export default SearchForUser;
