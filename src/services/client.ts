import { isESM , importx } from "@discordx/importer";
import { Intents, Interaction } from 'discord.js';
import { Client } from 'discordx';
import "reflect-metadata";
import { appConfig } from "../../config.json";
import { log } from "../index";


const client = new Client({
    botId: appConfig.id,
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ],

    //Comment this when release. only test
    botGuilds: [appConfig.testGuildID]
});

client.once("ready", async () => {
    await client.guilds.fetch();

    await client.clearApplicationCommands();
    await client.initApplicationCommands({
        global: { log: true },
        guild: { log: true },
    });

    await client.initApplicationPermissions(true);

    log.info("Client initialized");
});

client.on("interactionCreate", (interaction: Interaction) => {
    client.executeInteraction(interaction);
})

async function run(){
    log.info(`Currently running on module type : ${isESM?"ESModule":"CommonJS"}`)
    await importx("./src/{events,commands}/**/*.{ts,js}").then(() => {log.info("event, commands file imported")});
    if(typeof(appConfig.token)!=="undefined"){
        try{
            await client.login(appConfig.token);
        }
        catch(err){
            log.fatal("can't login to client. check is the token is valid. code : " , err);
            process.exit(1);
        }
    }
    else{
        log.fatal("there is no token data in config.json files. check and type token first");
        process.exit(1);
    }
}

export { run };
