import {
    APIEmbed,
    APIEmbedAuthor,
    APIEmbedField,
    APIEmbedFooter,
    APIEmbedImage,
    APIEmbedThumbnail,
    APIEmbedVideo,
    APIInteractionResponseCallbackData,
} from "discord-api-types/v10";
import { InteractionResponseType } from "discord-interactions";

export type APIResponse = {
    type: InteractionResponseType;
    data: APIInteractionResponseCallbackData;
};

export const response = (
    type: InteractionResponseType,
    data: APIInteractionResponseCallbackData,
) => {
    return {
        type: type,
        data: data,
    } as APIResponse;
};

export const commandNotFoundResponse = () => {
    const embed = new EmbedBuilder()
        .setTitle("Command not found")
        .setDescription("The command you are looking for does not exist.")
        .build();

    return response(InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE, {
        embeds: [embed],
    });
};

class EmbedBuilder {
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
