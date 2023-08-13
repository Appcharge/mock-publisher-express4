const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const router = require("../../controllers/auth/auth.controller");

const app = express();
app.use(bodyParser.json());
app.use(router);

jest.spyOn(global.console, "error").mockImplementation(() => {});

describe("POST /", () => {

    it("should handle successful login using userToken", async () => {
        const mockRequest = {
            authMethod: "userToken",
            token: "sampleUserToken",
            date: new Date().toISOString(),
            appId: "someAppId"
        };

        const response = await request(app)
            .post("/")
            .send(mockRequest);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("status", "valid");
    });

    it("should return error for unknown login method", async () => {
        const mockRequest = {
            authMethod: "unknownMethod",
            token: "sampleToken",
            date: new Date().toISOString(),
            appId: "someAppId"
        };

        const response = await request(app)
            .post("/")
            .send(mockRequest);

        expect(response.status).toBe(400);
    });

    it("should return error for invalid payload", async () => {
        const mockInvalidRequest = {
            authMethod: null, // Missing authMethod intentionally to simulate an invalid request
            token: null, // Missing token intentionally to simulate an invalid request
            date: new Date().toISOString(),
            appId: null, // Missing appId intentionally to simulate an invalid request
            userName: "JohnDoe"
        };

        const response = await request(app)
            .post("/")
            .send(mockInvalidRequest);

        expect(response.status).toBe(400);
    });
});

afterAll(() => {
    jest.restoreAllMocks();
});
