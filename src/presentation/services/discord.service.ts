import {envs} from "../../config";

export class DiscordService {

    private readonly discordWebhookUrl:string = envs.DISCORD_WEBHOOK_URL;
    constructor() {
    }

    async notify(message:string){
        const body ={
            content: message,
            embeds:[
                {
                    image:{
                        url: 'https://media.giphy.com/media/NytMLKyiaIh6VH9SPm/giphy.gif',
                    }
                }
            ]
        }

        const response = await fetch(this.discordWebhookUrl , {
            method: 'POST',
            headers:{ 'Content-Type': 'application/json'},
            body: JSON.stringify(body),
        } );

        if(!response.ok){
            console.log('Error sending message to discord');
            return false;
        }

        return true;
    }
}