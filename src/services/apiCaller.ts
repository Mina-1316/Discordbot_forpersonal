import {log} from "../index";

import fetch from "node-fetch"
// https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Using_Fetch
// https://stackoverflow.com/questions/41103360/how-to-use-fetch-in-typescript
/**
 * <h2> HTTP API Request Function</h2>
 * returns Promise JSON object that you formatted as generic.
 * 
 * @param {string} url - the url you want to request
 * @param {RestHTTPRequestOption} options - request options. you should set HTTP method, but headers and body are optional
 * @return {Promise<T>} response - the server's response return as you formatted on generic.
 * @see RestHttpRequestOption
 */
export async function api<T>(url: string, options: RestHTTPRequestOption): Promise<T> {
    let response = await fetch(url, {
        method: options.method,
        headers: options.headers, 
        body: JSON.stringify(options.body)
    });
    if(!response.ok){
        throw new Error(response.statusText);
    }
    
    return response.json() as Promise<T>;
}


interface RestHTTPRequestOption{
    method: "GET" | "POST" | "PUT" | "DELETE";
    headers?:  { [key: string]: string } | undefined;
    body? : JSON;
}
