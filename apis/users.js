import { request } from "@playwright/test";
import {
  randomFirstName,
  randomLastName,
  randomUserName,
} from "../utils/dataGeneration";

const requestContext = async () => {
  const apiContext = await request.newContext();
  return apiContext;
};

const createUser = async () => {
  const apiContext = await requestContext();
  const username = randomUserName();
  const userData = {
    username: username,
    firstName: randomFirstName(),
    lastName: randomLastName(),
    email: `${username}@test.com`,
    password: "123456",
    phone: "1234567890",
    userStatus: 0,
  };

  const res = await apiContext.post(`${process.env.BASE_URL}/user`, {
    data: userData,
  });

  return { res, userData };
};

const getUser = async (username) => {
  const apiContext = await requestContext();
  const res = await apiContext.get(`${process.env.BASE_URL}/user/${username}`);

  return res;
};

const updateUserByUsername = async (userData) => {
  const apiContext = await requestContext();

  const newData = {
    id: 0,
    username: userData.username,
    firstName: userData.firstName,
    lastName: randomLastName(),
    email: `${userData.username}@test.com`,
    password: userData.password,
    phone: "9876542100",
    userStatus: 0,
  };

  const res = await apiContext.put(
    `${process.env.BASE_URL}/user/${userData.username}`,
    {
      data: newData,
    }
  );

  return { res, newData };

  // expect(res.status()).toBe(200);
  // const data = await res.json();
  // return data;
};

const login = async ({ username, password }) => {
  const apiContext = await requestContext();

  const res = await apiContext.get(
    `${process.env.BASE_URL}/user/login?username=${username}&password=${password}`
  );

  return res;
};

const logout = async () => {
  const apiContext = await requestContext();

  const res = await apiContext.get(`${process.env.BASE_URL}/user/logout`);

  return res;
};

export { getUser, createUser, updateUserByUsername, login, logout };
