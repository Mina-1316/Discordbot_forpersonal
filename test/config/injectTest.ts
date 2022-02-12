import { Injectable, Container } from '../../src/index';

import { describe } from 'mocha';
import { default as expect } from 'expect.js'

const readableMessage = 'MockClassNoArgs Hello';

@Injectable
class MockClassNoArgs{
    constructor(){}

    sayHello(){ return 'MockClassNoArgs Hello'}
}

@Injectable
class MockClass1Args{
    constructor(public mock: MockClassNoArgs){ }
}

@Injectable
class MockClassDeepArgs{
    constructor(public mock: MockClassNoArgs, public mock2: MockClass1Args) { }
}


let injectTest = ()=>{
    describe('DI Module Test', () => {
        const injector = Container;
        beforeEach(() => { });
        afterEach(() => { });

        it('test object inject on containers', () => {
            let injected = injector.getInstance<MockClassNoArgs>(MockClassNoArgs);
            expect(injected).not.be(undefined);
        });

        it('it should inject a not null object and use methods on it', () => {
            let injected = injector.getInstance(MockClassNoArgs);
            const hello = injected.sayHello();
            expect(hello).be(readableMessage);
        });

        it('it should be able to inject a dependable class', () => {
            let injected = injector.getInstance(MockClass1Args);
            const hello = injected.mock.sayHello();
            expect(hello).be(readableMessage);
        });
        
        it('it should be able to inject a dependable class with a dependable class (2 levels down)', () => {
            let injected = injector.getInstance(MockClassDeepArgs);
            const hello = injected.mock.sayHello();
            const hello2 = injected.mock2.mock.sayHello();
            expect(hello).be(readableMessage);
            expect(hello2).be(readableMessage);
        });
    });
}
export default injectTest;