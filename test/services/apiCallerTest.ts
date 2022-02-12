import { describe } from 'mocha';
import { default as expect } from 'expect.js';
import nock from 'nock';

import { api } from '../../src/index';

// http://httpbin.org/#/ - for http request test
const baseurl = "http://httpbin.org"

let apiCallerTest = () => {
    //Test 
    describe('api Caller Function Test', () => {
        const geturl = "/get";
        it("GET fetch test - Request only", async () => {
            const res = await api<{ url: string }>(baseurl+geturl, { method: "GET" });
            expect(res.url).be("http://httpbin.org/get");
        });
        it("GET fetch test - Request with query parameter", async () => {
            const expects = "Hello";
            const query = `?query=${expects}`;
            const res = await api<{ args: {query: string} }>(baseurl+geturl+query, { method: "GET" });
            expect(res.args.query).be(expects);
        });
        it("GET fetch test - Request with Header", async () => {
            const expects = "test";
            const res = await api<{ headers: { Testheader: string } }>(baseurl+geturl, { method: "GET", headers: { Testheader: expects }});
            expect(res.headers.Testheader).be(expects);
        });

        const posturl = '/post';
        it("POST fetch test - Request only", async () => {
            const expects = "http://httpbin.org/post";
            const res = await api<{ url: string }>(baseurl+posturl, { method: "POST" });
            expect(res.url).be(expects);
        });
        it("POST fetch test - Request with Header", async () => {
            const expects = "testheader";
            const res = await api<{ headers: { Testheader: string } }>(baseurl+posturl, { method: "POST", headers: { Testheader: expects } });
            expect(res.headers.Testheader).be(expects);
        });
        it("POST fetch test - Request with query parameter", async () => {
            const expects = "tests";
            const query = `?test=${expects}`;
            const res = await api<{ args: { test: string } }>(baseurl+posturl+query, { method: "POST" });
            expect(res.args.test).be(expects);
        });
        it("POST fetch test - Request with body", async () => {
            const expects = "{\"args\":{\"test\":\"yes\"}}";
            const res = await api<{ data: string }>(baseurl+posturl, { method: "POST", body: JSON.parse(expects) });
            expect(res.data).be(expects);
        });

        const puturl = '/put';
        it("PUT fetch test - Request only", async () => {
            const expects = "http://httpbin.org/put";
            const res = await api<{ url: string }>(baseurl+puturl, { method: "PUT" });
            expect(res.url).be(expects);
        });
        it("PUT fetch test - Request with Header", async () => {
            const expects = "testheader";
            const res = await api<{ headers: { Testheader: string } }>(baseurl+puturl, { method: "PUT", headers: { Testheader: expects } });
            expect(res.headers.Testheader).be(expects);
        });
        it("PUT fetch test - Request with query parameter", async () => {
            const expects = "tests";
            const query = `?test=${expects}`;
            const res = await api<{ args: { test: string } }>(baseurl+puturl+query, { method: "PUT" });
            expect(res.args.test).be(expects);
        });
        it("PUT fetch test - Request with body", async () => {
            const expects = "{\"args\":{\"test\":\"yes\"}}";
            const res = await api<{ data: string }>(baseurl+puturl, { method: "PUT", body: JSON.parse(expects) });
            expect(res.data).be(expects);
        });

        const deleteurl = '/delete'
        it("DELETE fetch test - Request only", async () => {
            const expects = "http://httpbin.org/delete";
            const res = await api<{ url: string }>(baseurl+deleteurl, { method: "DELETE" });
            expect(res.url).be(expects);
        });
        it("DELETE fetch test - Request with Header", async () => {
            const expects = "testheader";
            const res = await api<{ headers: { Testheader: string } }>(baseurl+deleteurl, { method: "DELETE", headers: { Testheader: expects } });
            expect(res.headers.Testheader).be(expects);
        });
        it("DELETE fetch test - Request with query parameter", async () => {
            const expects = "tests";
            const query = `?test=${expects}`;
            const res = await api<{ args: { test: string } }>(baseurl+deleteurl+query, { method: "DELETE" });
            expect(res.args.test).be(expects);
        });
        it("DELETE fetch test - Request with body", async () => {
            const expects = "{\"args\":{\"test\":\"yes\"}}";
            const res = await api<{ data: string }>(baseurl+deleteurl, { method: "DELETE", body: JSON.parse(expects) });
            expect(res.data).be(expects);
        });
    });

};

export default apiCallerTest;