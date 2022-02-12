//Config Test import
import { default as injectTest } from './config/injectTest';

//services test import
import { default as apiCallerTest } from './services/apiCallerTest';
import { typenameToIdFetcherTest } from './services/fuzzworkNameToIDFetcherTest';
import { evepraisalFetchTest } from './services/evepraisalFetcherTest'

//Test index
describe('whole test run', () => {
    //config
    describe('config', () => {
        injectTest();
    });

    //services
    describe('service', () => {
        apiCallerTest();
        typenameToIdFetcherTest();
        evepraisalFetchTest();
    })
})
