import express, {Request, Response, NextFunction} from 'express';
import {envs} from "./config";
import {GitHubController} from "./presentation";
import {GithubSha256Middleware} from "./presentation/middlewares/github-sha256.middleware";

(()=>{
    main();
})();

function main() {
    const app = express();
    const gitHubController = new GitHubController();
    app.use(express.json());

    app.use(GithubSha256Middleware.verifySignature);
    app.post('/api/github',gitHubController.webhookHandler)

    app.listen(envs.PORT, ()=>{
        console.log(`App running on port ${envs.PORT}`);
    });
}

