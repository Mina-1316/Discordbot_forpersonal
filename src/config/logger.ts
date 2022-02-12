import bunyan, { LogLevel, LogLevelString } from 'bunyan';

import { 
         //Config.JSON
    colorMap,         //colorMap
} from '../index';

import { loggerConfig } from '../../config.json';

let log: bunyan
const logConfig = loggerConfig;

if(loggerConfig !== undefined) {
    log = bunyan.createLogger({
        name: logConfig.name
    });
    // logConfig.cstreams.forEach((value, index, arr)=>{
    //     try{
    //         log.addStream({
    //             stream: process.stdout,
    //             level: bunyan.resolveLevel(value.level as LogLevelString)
    //         })}
    //     catch{
    //         console.log(`${colorMap.FgRed}[Error]${colorMap.FgBlack} : type LogLevelString got wrong parameter - ${value.level} level must be {info, error, warn, or etc...}`);
    //     }
    // });
    
    logConfig.fstreams.forEach((value, index, arr)=>{
        try{
            log.addStream({
                type: value.type,
                path: value.path,
                level: bunyan.resolveLevel(value.level as LogLevelString),
                period: value.period,
                count: value.count
            })}
        catch{
            console.log(`[Error] : get error on adding File Stream to logger. check logger.ts(l26)}`);
        }
    });

    log.info("Logger Initialization complete.");
}
else{
    console.log(`[Error] : logger init failed. check config.json to find loggerConfig`);
    process.exit(1);
}




export { log };