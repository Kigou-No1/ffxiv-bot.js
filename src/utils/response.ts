/**
 * @file response.ts
 * @description This file contains the response functions for the Discord API.
 */

import {
    APIApplicationCommandAutocompleteResponse,
    APICommandAutocompleteInteractionResponseCallbackData,
    APIEmbed,
    APIEmbedAuthor,
    APIEmbedField,
    APIEmbedFooter,
    APIEmbedImage,
    APIEmbedThumbnail,
    APIEmbedVideo,
    APIInteractionResponseCallbackData,
    APIModalInteractionResponseCallbackData,
    RESTDeleteAPIInteractionFollowupResult,
    RESTDeleteAPIInteractionOriginalResponseResult,
    RESTGetAPIInteractionOriginalResponseResult,
    RESTPatchAPIInteractionFollowupJSONBody,
    RESTPatchAPIInteractionFollowupResult,
    RESTPatchAPIInteractionOriginalResponseJSONBody,
    RESTPatchAPIInteractionOriginalResponseResult,
    RESTPostAPIInteractionFollowupJSONBody,
} from "discord-api-types/v10";
import { InteractionResponseType } from "discord-interactions";
import { Context } from "hono";
import { Env } from "../types/types";

export type APIResponse = {
    response: {
        type: InteractionResponseType;
        data:
            | APIInteractionResponseCallbackData
            | APICommandAutocompleteInteractionResponseCallbackData
            | APIModalInteractionResponseCallbackData;
    };
    deffered?: boolean;
};

/**
 * @class EmbedBuilder
 * @description Embedを生成するためのクラスです。
 * @example
 * const embed = new EmbedBuilder()
 *    .setTitle("Title")
 *   .setDescription("Description")
 *   .build();
 * @returns {APIEmbed}
 */

export class EmbedBuilder {
    private embed: APIEmbed = {};

    constructor(optitons?: {
        title?: string;
        description?: string;
        url?: string;
        timestamp?: string;
        color?: number;
        footer?: APIEmbedFooter;
        image?: APIEmbedImage;
        thumbnail?: APIEmbedThumbnail;
        author?: APIEmbedAuthor;
        fields?: APIEmbedField[];
        video?: APIEmbedVideo;
    }) {
        this.embed = {
            ...optitons,
        };
    }

    public setTitle(title: string) {
        this.embed.title = title;
        return this;
    }

    public setDescription(description: string) {
        this.embed.description = description;
        return this;
    }

    public setUrl(url: string) {
        this.embed.url = url;
        return this;
    }

    public setTimestamp(timestamp: string) {
        this.embed.timestamp = timestamp;
        return this;
    }

    public setColor(color: number) {
        this.embed.color = color;
        return this;
    }

    public setFooter(footer: APIEmbedFooter) {
        this.embed.footer = footer;
        return this;
    }

    public setImage(image: APIEmbedImage) {
        this.embed.image = image;
        return this;
    }

    public setThumbnail(thumbnail: APIEmbedThumbnail) {
        this.embed.thumbnail = thumbnail;
        return this;
    }

    public setAuthor(author: APIEmbedAuthor) {
        this.embed.author = author;
        return this;
    }

    public addField(field: APIEmbedField) {
        if (this.embed.fields === undefined) {
            this.embed.fields = [field];
        }
        this.embed.fields.push(field);
        return this;
    }

    public removeField(index: number) {
        if (this.embed.fields === undefined) {
            return this;
        }
        this.embed.fields.splice(index, 1);
        return this;
    }

    public insertField(index: number, field: APIEmbedField) {
        if (this.embed.fields === undefined) {
            this.embed.fields = [field];
        }
        this.embed.fields.splice(index, 0, field);
        return this;
    }

    public setVideo(video: APIEmbedVideo) {
        this.embed.video = video;
        return this;
    }

    public build() {
        return this.embed;
    }
}

/**
 * @class DefferedInteractionResponse
 * @description DefferedInteractionResponseを生成するためのクラスです。
 * @example
 * const defferedResponse = new DefferedInteractionResponse(context.env.DISCORD_CLIENT_ID, interaction.token)
 * const res = await defferedResponse.createFollowup({
 *    content: "Deffered response!",
 * });
 * @returns {DefferedInteractionResponse}
 */

export class DefferedInteractionResponse {
    private baseURL = "https://discord.com/api/v10/webhooks";
    private applicationId: string;
    private token: string;
    private url: string;
    private originalUrl: string;
    private header;
    constructor(applicatoinId: string, token: string, context: Context<Env>) {
        this.applicationId = applicatoinId;
        this.token = token;
        this.url = `${this.baseURL}/${this.applicationId}/${this.token}`;
        this.originalUrl = `${this.url}/messages/@original`;
        this.header = {
            Authorization: `Bot ${context.env.DISCORD_TOKEN}`,
            "Content-Type": "application/json; charset=utf-8",
            "User-Agent": "DiscordBot (https://github.com/Kigou-No1/ffxiv-bot.js, 0.0.1)",
        };
    }

    public async getOriginal() {
        const req = await fetch(this.originalUrl, {
            method: "GET",
            headers: this.header,
        });
        const res = await req.json();
        return res as RESTGetAPIInteractionOriginalResponseResult;
    }

    public async editOriginal(data: RESTPatchAPIInteractionOriginalResponseJSONBody) {
        const req = await fetch(this.originalUrl, {
            method: "PATCH",
            headers: this.header,
            body: JSON.stringify(data),
        });
        const res = await req.json();
        return res as RESTPatchAPIInteractionOriginalResponseResult;
    }

    public async deleteOriginal() {
        const req = await fetch(this.originalUrl, {
            method: "DELETE",
            headers: this.header,
        });
        const res = await req.json();
        return res as RESTDeleteAPIInteractionOriginalResponseResult;
    }

    public async createFollowup(data: RESTPostAPIInteractionFollowupJSONBody) {
        const req = await fetch(this.url, {
            method: "POST",
            headers: this.header,
            body: JSON.stringify(data),
        });
        const res = await req.json();
        console.log(req.status);
        return res as RESTPostAPIInteractionFollowupJSONBody;
    }

    public async editFollowup(messageId: string, data: RESTPatchAPIInteractionFollowupJSONBody) {
        const req = await fetch(`${this.url}/${messageId}`, {
            method: "PATCH",
            headers: this.header,
            body: JSON.stringify(data),
        });
        const res = await req.json();
        return res as RESTPatchAPIInteractionFollowupResult;
    }

    public async deleteFollowup(messageId: string) {
        const req = await fetch(`${this.url}/${messageId}`, {
            method: "DELETE",
            headers: this.header,
        });
        const res = await req.json();
        return res as RESTDeleteAPIInteractionFollowupResult;
    }
}

/**
 * 
 * @param type レスポンスの種類を表します。
 * @param data メッセージの内容を表します。
 * @param deffered これをtrueに設定すると、command.deferHandlerが呼び出されるようになります。
 * @returns {APIResponse}
 */

export const response = (
    type: InteractionResponseType,
    data: APIInteractionResponseCallbackData,
    deffered?: boolean,
) => {
    return {
        response: {
            type,
            data,
        },
        deffered,
    } as APIResponse;
};

/**
 * 
 * @param data 入力されたオプションの値を表します。
 * @returns {APIApplicationCommandAutocompleteResponse}
 */

export const autocompleteResponse = (
    data: APICommandAutocompleteInteractionResponseCallbackData,
) => {
    return {
        type: InteractionResponseType.APPLICATION_COMMAND_AUTOCOMPLETE_RESULT,
        data: data,
    } as unknown as APIApplicationCommandAutocompleteResponse;
};

/**
 * コマンドが存在しないことを示すレスポンスを返します。
 * @returns {APIResponse}
 */

export const commandNotFoundResponse = () => {
    const embed = new EmbedBuilder()
        .setTitle("Command not found")
        .setDescription("The command you are looking for does not exist.")
        .build();

    return response(InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE, {
        embeds: [embed],
    });
};
