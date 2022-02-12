import { describe } from 'mocha';
import { default as expect } from 'expect.js';

import { getPraisalJson } from "../../src/index";

export let evepraisalFetchTest = () => {
    describe("Request temporal market data from evepraisal.com", () => {
        it("request item \"Tritanium\"'s price by name", async ()=> {
            expect((await getPraisalJson({ target: "Tritanium" })).market_name).equal("universe");
        });
        it("request item \"Maller\"'s price by id 624", async ()=> {
            expect((await getPraisalJson({ target: 624 })).market_name).equal("universe");
        });
    });
};