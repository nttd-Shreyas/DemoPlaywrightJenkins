import fs from "fs";

export async function getInputData(fileName) {
  const jsonFilePath = `./testdata/${fileName}.json`;
  const inputData = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));
  return inputData;
}

export async function updateDataInFile(data, fileName) {
  const jsonFilePath = `./testdata/${fileName}.json`;
  let existingData = JSON.parse(await fs.readFileSync(jsonFilePath, "utf-8"));

  // update the list locally for specific record
  existingData = existingData.map((fileData) => {
    if (fileData.username === data.username) {
      return {
        ...fileData,
        ...data,
      };
    }
    return fileData;
  });

  // update the file
  await fs.writeFileSync(jsonFilePath, JSON.stringify(existingData, null, 2));
}

export async function writeToFile(data, fileName) {
  const jsonFilePath = `./testdata/${fileName}.json`;

  // read file first and if not exists then create one
  await fs.readFile(jsonFilePath, "utf-8", (err) => {
    if (err && err.code === "ENOENT") {
      const dataToWrite = [data];

      fs.writeFileSync(jsonFilePath, JSON.stringify(dataToWrite));
    } else {
      let existingData = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));
      existingData.push(data);

      fs.writeFileSync(jsonFilePath, JSON.stringify(existingData));
    }
  });
}
