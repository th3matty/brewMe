import {
  graphQl_Uri,
  getUserList,
  getUserListByCount,
  setUserAvatar,
  setUserDescription,
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
    console.info("searchResult:", searchResult);

    if (!searchResult) {
      throw new Error("Something went wrong");
    }

    const user = searchResult.data.getUserList[0];
    return user;
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

    const reverseListOfUser = await listOfUser.reverse().slice(0, 10);
    console.log("reverseListOfUser:", reverseListOfUser);

    return reverseListOfUser;
  } catch (err) {
    console.log(err);
  }
};

export const SetUserAvatar = async (avatar, token, setUser) => {
  const setSettings = setUserAvatar(avatar);
  

  try {
    const setSetting = await fetch(graphQl_Uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(setSettings),
    });
    const setSettingResult = await setSetting.json();
    
    if(!setSettingResult){
      throw new Error("something went wrong")
    }
    const user = await setSettingResult.data.setUserSettings
    return setUser(user)

  } catch (err) {
    console.log(err);
  }
};

export const SetUserDescription = async (description, token, setUser) => {
  const setSettings = setUserDescription(description);
  

  try {
    const setSetting = await fetch(graphQl_Uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(setSettings),
    });
    const setSettingResult = await setSetting.json();
    
    if(!setSettingResult){
      throw new Error("something went wrong")
    }
    const user = await setSettingResult.data.setUserSettings
    return setUser(user)

  } catch (err) {
    console.log(err);
  }
};
