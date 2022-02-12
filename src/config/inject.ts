import 'reflect-metadata';

/**
 * Types for constructable objects.
 */
interface Constructable<T=any> {
    new(...params: any[]): T;
}

/**
 * Decorator that indicates DI Module to inject.
 * @types classDecorator
 * @returns constructor
 */
export function Injectable(constructor: Constructable): Constructable {
    return constructor;
}

/**
 * DI container class.
 * you should init this class before you run your project
 */
class Injector{
    /**
     * fields that contains dependencies
     */
    private diMap = new Map();

    /**
     * find/create and return requested dependencies instance
     * @param contr 
     * @returns instance
     */
    getInstance<T>(contr: Constructable<T>): T{
        const instance = this.constructObject(contr);
        return instance;
    }

    private constructObject(constructor: Constructable){
        let currentInstance = this.diMap.get(constructor);
        if(currentInstance) return currentInstance;

        const metaData: Constructable[] = Reflect.getMetadata('design:paramtypes', constructor);
        const argumentsInstances = metaData.map((params) => this.constructObject(params));

        currentInstance = new constructor(...argumentsInstances);
        this.diMap.set(constructor, currentInstance);

        return currentInstance;
    }
}

let Container = new Injector();

export { Container };