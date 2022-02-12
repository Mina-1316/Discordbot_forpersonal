import { CommandInteraction } from 'discord.js';
import { Discord, Slash, SlashOption, SlashChoice, Guild } from "discordx"

import { appConfig } from "../../config.json"


enum TextChoices {
    // WhatDiscordShows = value
    Hello = "Hello",
    "Good Bye" = "GoodBye",
}
  
@Discord()
export abstract class choicesExample {
    
    @Guild(appConfig.testGuildID)
    @Slash("choose")
    async choose(
        @SlashChoice("Human", "human")
        @SlashChoice("Astraunot", "astro")
        @SlashChoice("Dev", "dev")
        @SlashOption("what", { description: "What are you?" })
        what: string,
      
        interaction: CommandInteraction
    ) {
      interaction.reply(what);
    }
  
    @Slash("choice")
    async choice(
        @SlashChoice(TextChoices)
        @SlashChoice("How are you", "question")
        @SlashOption("text")
        what: string,
      
        interaction: CommandInteraction
    ) {
      interaction.reply(what);
    }
}