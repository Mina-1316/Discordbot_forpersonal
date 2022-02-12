import { describe } from 'mocha';
import { default as expect } from 'expect.js';

import { nameToIdFetcher } from "../../src/index";

export let typenameToIdFetcherTest = () => {
    describe("Typename to TypeID Fetch API request", () => {
        it("request typeid of name \"Tritanium\"", async ()=> {
            expect(await nameToIdFetcher("Tritanium")).equal(34);
        });
        it("request typeid of name \"Maller\"", async ()=> {
            expect(await nameToIdFetcher("Maller")).equal(624);
        });
        it("request bad item", async ()=> {
            expect(await nameToIdFetcher("abc")).equal(0);
        });
    });
};