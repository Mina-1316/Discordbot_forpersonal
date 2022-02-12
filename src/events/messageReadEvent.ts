import type { ArgsOf } from "discordx";
import { Discord, On, Client } from "discordx";

@Discord()
export abstract class MessageReadEvent{
    @On("messageCreate")
    private onMessage(
        [message]: ArgsOf<"messageCreate">,
        client: Client,
        guardPayload: any
    ){
        
    }
}