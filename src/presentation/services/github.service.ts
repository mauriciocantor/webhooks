import {GitHubIssuePayload, GitHubStarPayload} from "../../interfaces";


export class GithubService {
    constructor(

    ) {
    }

    onStar(payload: GitHubStarPayload):string{
        let message:string='';
        const {starred_at, sender,repository,action} = payload;

        return `User ${sender.login} ${action} star on ${repository.full_name}`;
    }

    onIssue(payload: GitHubIssuePayload):string{

        const {action, issue , sender, repository} = payload;

        if(action==='opened'){
            return `An issue was opened with this title ${issue.title}`;
        }

        if(action==='closed'){
            return `An issue was closed by ${issue.user.login}`;
        }

        return `Unhandled action for the issue event ${action}`;
    }
}