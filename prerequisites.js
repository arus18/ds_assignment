// Check if secrets exist
const fs = require("fs");
if (!fs.existsSync("./secrets.yaml")) {
  console.log("Error: secrets.yaml is missing. Put it in the root of the project.");
  process.exit(1)
}
