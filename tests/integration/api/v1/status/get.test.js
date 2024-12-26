import orchestrator from "../orchestrator.js";
const Ajv = require("ajv");

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test("GET to api/v1/status should return 200", async () => {
  const schema = {
    type: "object",
    additionalProperties: false,
    properties: {
      update_at: { type: "string" },
      dependencies: {
        type: "object",
        additionalProperties: false,
        properties: {
          database: {
            type: "object",
            additionalProperties: false,
            properties: {
              version: { type: "string" },
              max_connections: { type: "number" },
              used_connections: { type: "number" },
            },
          },
        },
      },
    },
  };
  const ajv = new Ajv();
  const validate = await ajv.compile(schema);

  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  const valid = validate(responseBody);
  expect(valid).toBeTruthy();

  expect(responseBody.dependencies.database.version).toBeDefined();
  expect(responseBody.dependencies.database.version).toMatch(/16.6/);
  expect(responseBody.dependencies.database.max_connections).toBeDefined();
  expect(responseBody.dependencies.database.max_connections).toBe(100);
  expect(responseBody.dependencies.database.used_connections).toBeDefined();
  expect(responseBody.dependencies.database.used_connections).toBe(1);
});
