import { test, expect } from "@playwright/test";
import { createUser, getUser, updateUserByUsername } from "../apis/users";
import { getInputData, writeToFile, updateDataInFile } from "../utils/dataIO";

// get the user-details from file
const userDataInput = await getInputData("userData");

test.describe("Users API Test", async () => {
  // get user
  userDataInput.forEach((user) => {
    test(`Get User ${user.username}`, async () => {
      const res = await getUser(user.username);

      // assertions

      expect(res.status()).toBe(200);

      const data = await res.json();

      expect(data.username).toBe(user.username);
      expect(data.email).toBe(user.email);

      console.log("GET USER:: ", data);
    });
  });

  // update user
  test("Update user", async () => {
    // get random user from the list of users
    const randomUser =
      userDataInput[Math.floor(Math.random() * userDataInput.length)];

    console.log("BEFORE UPDATE:: ", randomUser);

    const { res, newData } = await updateUserByUsername(randomUser);

    expect(res.status()).toBe(200);
    let data = await res.json();
    data = { ...data, ...newData };
    await updateDataInFile(data, "userData");

    console.log("UPDATE USER:: ", data);
  });

  // create user
  test("Create user", async () => {
    const { res, userData } = await createUser();

    expect(res.status()).toBe(200);

    let data = await res.json();

    await writeToFile(userData, "userData");

    console.log("CREATE USER:: ", data);
  });
});
