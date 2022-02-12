import { api, nameToIdFetcher } from '../../src/index';

const evepraisalUrl = "https://evepraisal.com/item/";

export async function getPraisalJson(params: GetPraisalJsonParam): Promise<EvePraisalJsonReturn> {
    let res = (await api<{summaries: EvePraisalJsonReturn[]}>(evepraisalUrl + params.target + ".json", { method: "GET" }));
    let target = res.summaries.find(tgt => tgt.market_name === params.region);
    if(target===undefined) target = res.summaries.find(tgt => tgt.market_name === "universe");
    if(target!==undefined) return target;
    else throw new Error("failed to find array elements on getPraisalJson Function");
}

interface GetPraisalJsonParam{
    target: number | string;
    region?: string;
}

interface EvePraisalJsonReturn{
    market_name: string,
    prices: {
        all: OrderPriceStructure,
        buy: OrderPriceStructure,
        sell: OrderPriceStructure,
    }
}

interface OrderPriceStructure{
    avg: number;
    max: number,
    median: number,
    min: number,
    percentile: number,
    stddev: number,
    volume: number,
    order_count: number
}