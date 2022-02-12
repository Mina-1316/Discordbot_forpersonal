import { CommandInteraction, MessageEmbed } from 'discord.js';
import { Discord, Slash, SlashOption, SlashChoice, Guild, SlashGroup } from "discordx"

import { appConfig } from "../../config.json"
import { getPraisalJson, log } from "../index"

const plexId = 44992;

enum ChoiceRegion{
    "Universe" = "universe",
    "Jita" = "jita",
    "Perimeter" = "perimeter",
    "Amarr" = "amarr",
    "Dodixie" = "dodixie",
    "Hek" = "hek",
    "Rens" = "rens"
}

@Discord()
@Guild(appConfig.testGuildID)
@SlashGroup("plex", "Prints plex price quick")
export abstract class SlashPlexPrice {
    
    @Slash("now")
    async priceNow( 
        @SlashChoice(ChoiceRegion)
        @SlashOption("region", { description: "choose region to focus. default is universe"})
        region: string = ChoiceRegion.Universe,
        interaction: CommandInteraction 
    ) {
        try{ 
            let priceReceived = await getPraisalJson({ target: plexId, region: region}); 
            if (priceReceived === undefined) throw new Error("received price is undefined");
            let buy = priceReceived.prices.buy;
            let sell = priceReceived.prices.sell;
            const embed = new MessageEmbed()
                .setColor('#CDCD00')
                .setTitle("PLEX")
                .setDescription(`${region}지역의 플렉스 가격`)
                .setFooter({ text: `메시지 호출 시간: ${interaction.createdAt}` })
                .setThumbnail("https://images.evetech.net/types/44992/icon")
                .setAuthor({ name: "evepraisal.com",
                        url: "https://evepraisal.com",
                        iconURL: "https://evepraisal.com/static/favicon.ico" })
                .setFields([{
                        name: "Buy",
                        value: `**Max** : *${rup(buy.max)}*\n**Median** : *${rup(buy.median)}*\n`
                            +`**average** : *${rup(buy.avg)}*\n**Volume** : *${rup(buy.volume)}*`,
                        inline: true
                    },{
                        name: "Sell",
                        value: `**Min** : *${rup(sell.min)}*\n**Median** : *${rup(sell.median)}*\n`
                            +`**average** : *${rup(sell.avg)}*\n**Volume** : *${rup(sell.volume)}*`,
                        inline: true},]);

            interaction.reply({embeds: [embed]});
        }
        catch(e){ 
            log.error("error occured while parsing data on SlashPlexPrice/now. error - " + e);
            interaction.reply("값을 불러오지 못했습니다. 관리자에게 문의하세요.");
        }
    }
}

function rup(input: number): number {
    return Math.round(input*100)/100
}