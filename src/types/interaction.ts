import { InteractionType } from "discord-interactions";
import { APIUser, APIMessage, APIChannel, APIGuild, APIGuildMember, Locale, Snowflake, InteractionContextType, APIApplicationCommandInteractionData} from "discord-api-types/v10";

export type Interaction = {
    id: Snowflake;
    application_id: Snowflake;
    type: InteractionType;
    data?: APIApplicationCommandInteractionData;
    guild?: APIGuild;
    guild_id?: Snowflake;
    channel?: APIChannel;
    channel_id?: Snowflake;
    member?: APIGuildMember;
    user?: APIUser;
    token: string;
    version: number;
    message?: APIMessage;
    locale?: Locale;
    guild_locale?: Locale;
    context: InteractionContextType;
}
