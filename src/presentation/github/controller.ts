import {Request, Response} from "express";
import {GithubService} from "../services/github.service";
import {DiscordService} from "../services/discord.service";

export class GitHubController {
    constructor(
        private readonly githubService = new GithubService(),
        private readonly discordService = new DiscordService(),
    ) {
    }

    public webhookHandler = (req:Request, res:Response)=>{
        const githubEvent = req.header('x-github-event')??'unknown';
        //const signature = req.header('x-hub-signature-256')??'unknown';

        const {body}=req;
        let message:string='';

        switch (githubEvent) {
            case 'star':
                message=this.githubService.onStar(body);
                break;

            case 'issues':
                message=this.githubService.onIssue(body);
                break;

            default:
                console.log(`unknown event ${githubEvent}`);
        }


        this.discordService.notify(message)
            .then(()=>res.status(202).send('Accepted'))
            .catch(()=>res.status(500).json({error:'Internal server error'}))
        ;
    }
}