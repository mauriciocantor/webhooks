import express, {Request, Response, NextFunction} from 'express';
import {envs} from "./config";
import {GitHubController} from "./presentation";

(()=>{
    main();
})();

function main() {
    const app = express();
    const gitHubController = new GitHubController();
    app.use(express.json());

    app.post('/api/github',gitHubController.webhookHandler)

    app.listen(envs.PORT, ()=>{
        console.log(`App running on port ${envs.PORT}`);
    });
}

