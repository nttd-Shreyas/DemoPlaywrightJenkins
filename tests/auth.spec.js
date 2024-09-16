import { test, expect } from "@playwright/test";
import { login, logout } from "../apis/users";
import { getInputData } from "../utils/dataIO";

// get the user-details from file
const userDataInput = await getInputData("userData");

test.describe("User Auth Tests", async () => {
  // login user
  test("Login User", async () => {
    const randomUser =
      userDataInput[Math.floor(Math.random() * userDataInput.length)];

    const res = await login({
      username: randomUser.username,
      password: randomUser.password,
    });

    expect(res.status()).toBe(200);

    const data = await res.json();
    expect(data.message).toContain("logged in user");
  });

  //   logout
  test("Logout User", async () => {
    const res = await logout();

    expect(res.status()).toBe(200);

    const data = await res.json();
    expect(data.message).toContain("ok");
  });
});
