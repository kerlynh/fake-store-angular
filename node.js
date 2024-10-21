const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv").config({ path: "src/.env" });

const envFile = `export const environment = {
    API_URL: '${process.env.API_URL}',
    STORE_API: '${process.env.STORE_API}',
    STRIPE_TOKEN: '${process.env.STRIPE_TOKEN}'
}`;

const targetPath = path.join(__dirname, "./src/environments/environment.ts");
fs.writeFile(targetPath, envFile, (err) => {
  if (err) {
    console.error(err);
    throw err;
  } else console.log("You got it");
});
