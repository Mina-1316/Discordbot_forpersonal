import { api } from "../index";

const fuzzworkAPITypeExchangeURL = "http://www.fuzzwork.co.uk/api/typeid.php?typename=";

/**
 * 
 * @param {string} typename 
 * @returns {Promise(number)}
 */
export async function nameToIdFetcher(typename: string): Promise<number> {
    return (await api<{ typeID: number }>(fuzzworkAPITypeExchangeURL+typename, { method: "GET" })).typeID;
    
}