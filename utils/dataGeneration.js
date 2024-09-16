// User data generation methods

const firstNames = ["Harry", "Hitesh", "Rahul", "Shubham"];
const lastNames = ["Potter", "Sharma", "Johnson", "Kapur"];

export const randomUserName = () => {
  return (
    firstNames[Math.floor(Math.random() * firstNames.length)].toString() +
    Math.random().toString().substr(2, 2)
  );
};

export const randomFirstName = () => {
  return firstNames[Math.floor(Math.random() * firstNames.length)].toString();
};

export const randomLastName = () => {
  return lastNames[Math.floor(Math.random() * firstNames.length)].toString();
};
