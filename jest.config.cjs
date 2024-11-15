module.exports = {
    transform: {
      "^.+\\.js$": "babel-jest", // Use Babel to transform ES module files
    },
    testEnvironment: "node", // Set the test environment to Node.js
    moduleFileExtensions: ["js", "json", "node"], // Recognize these extensions
  };
  