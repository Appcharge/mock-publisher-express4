const request = require("supertest");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = require("../../controllers/player/player.controller");

jest.spyOn(global.console, "log").mockImplementation(() => {});

app.use(bodyParser.json());
app.use(router);

describe("POST /", () => {
    it("should handle request and return publisherPurchaseId", async () => {
        const mockRequest = {
            appChargePaymentId: "someId",
            purchaseDateAndTimeUtc: new Date().toISOString(),
            gameId: "someGameId",
            playerId: "somePlayerId",
            bundleName: "someBundleName",
            bundleId: "someBundleId",
            sku: "someSku",
            priceInCents: 100,
            priceInDollar: 1.00,
            currency: "USD",
            subTotal: 0.90,
            tax: 0.10,
            action: "purchase",
            actionStatus: "completed",
            products: [
                {
                    amount: 1,
                    sku: "someProductSku",
                    name: "someProductName"
                }
            ]
        };

        const response = await request(app)
            .post("/")
            .send(mockRequest);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("publisherPurchaseId");
    });

    it("should return 400 for invalid request", async () => {
        const mockInvalidRequest = {
            appChargePaymentId: "someId",
            purchaseDateAndTimeUtc: "someDate",
            gameId: "someGameId",
            bundleName: "someBundleName",
            bundleId: "someBundleId",
            sku: "someSku",
            priceInCents: 100,
            priceInDollar: 1.00,
            currency: "USD",
            subTotal: 0.90,
            tax: 0.10,
            action: "purchase",
            actionStatus: "completed",
            products: [
                {
                    amount: 1,
                    sku: "someProductSku",
                    name: "someProductName"
                }
            ]
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
