import { request } from "@playwright/test";

const requestContext = async () => {
  const apiContext = await request.newContext({
    baseURL: "https://petstore.swagger.io/v2/pet",
    extraHTTPHeaders: {
      "Content-Type": "application/json",
    },
  });

  return apiContext;
};

const addPet = async () => {
  const apiContext = await requestContext();

  const data = {
    category: {
      id: 2,
      name: "dog",
    },
    name: "Tommy",
    photoUrls: ["string"],
    tags: [
      {
        id: 0,
        name: "dogs",
      },
    ],
    status: "available",
  };

  const res = await apiContext.post("https://petstore.swagger.io/v2/pet", {
    data: data,
  });

  return res;
};

const getPet = async (pet) => {
  const apiContext = await requestContext();
  const res = await apiContext.get(
    `https://petstore.swagger.io/v2/pet/${pet.id}`
  );

  return res;
};

const getPetsByStatus = async (petStatus) => {
  const apiContext = await requestContext();
  const res = await apiContext.get(
    `https://petstore.swagger.io/v2/pet/findByStatus?status=${petStatus}`
  );

  return res;
};

export { addPet, getPet, getPetsByStatus };
