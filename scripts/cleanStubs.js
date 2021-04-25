const fs = require("fs");
const path = require("path");

const STUBS_PATH = path.join(__dirname, "..", "cypress/fixtures/stubs");

const SALES_STUB_PATH = path.join(STUBS_PATH, "sales.json");
const SUBSCRIPTIONS_STUB_PATH = path.join(STUBS_PATH, "subscriptions.json");

const readJsonFileSync = (path) => JSON.parse(fs.readFileSync(path));
const cleanData = (input = []) =>
  input.map(({ amount, timestamp }) => ({ amount, timestamp }));
const writeJsonFileSync = (path, data) => {
  fs.writeFileSync(path, JSON.stringify(cleanData(data), null, "  "));
};

const cleanStub = (path, stubTitle) => {
  console.log(`Reading ${stubTitle} stub at ${path}`);
  const stubData = readJsonFileSync(path);
  console.log(`Successfully read ${stubTitle} stub`);
  writeJsonFileSync(path, stubData);
  console.log(`Stub file rewritten at ${path}`);
};

cleanStub(SALES_STUB_PATH, "Sales");
cleanStub(SUBSCRIPTIONS_STUB_PATH, "Subscriptions");
