# Expectations

## The capstone projects have three primary goals for your growth as a developer.

### Understanding teamwork. 

In this project, you will be working on a codebase from scratch with 3-4 other teammates; you will have to deal with a common codebase, code reuse, merge conflicts, and intrateam communication.

### Behaving professionally.

Do not miss or be tardy to meetings. Do not miss deadlines without communicating in advance to your team that there will be a delay.

### Producing high-quality work. 

Attention to detail is a crucial aspect of distinguishing yourself as a developer. This means both code detail and design detail. View your work as an outsider would: does it look like professional work that you see in other sites?

# Tooling

## Github workflow

We will use Github to collaborate, review and manage the codebase of the projects.

## Steps to implement an Issue and create a Pull Request using the extension mentioned above:

1. Once the issue is created and assigned to yourself, head to VSCode.
2. Make sure you are on master or main branch, and do a git pull to pull recent changes.
3. Head to the extension for GitHub Pull Request and Issues, look for your issue (make sure you're signed into GitHub) and click the ➡️ icon when you want to start working on the issue. This will create a branch with this format your_id/issueNumber for example: halitbatur/issue3. Now that the branch is created, you can start coding right away addressing the issue (and only what the issue requires)
4. Make sure to commit your work regularly on each milestone and step.
5. Once you are done with the issue and you review your code and make sure it was prettified, you can commit the changes and push the branch to GitHub git push -u origin [BRANCH_NAME]. Please note that [BRANCH_NAME] should be the actual branch name created in step 3. Or you can use VSCode publish branch button
6. Now you can head to GitHub and create the Pull Request, or create it from inside VSCode if you like. The Pull request should reference the Issue number in the description. For example: Fixes #3 This would link the issue to the PR and close the issue once the PR is closed or Merged.
7. Once the PR is created, make sure you assign it to a reviewer (someone from your team + team leader)
8. Head back to vs code, and either click the ⏹️ stop button in the extension or just git checkout master to get it over with.
9. In case your work was rejected, or changes were required, you can checkout the branch of the PR git checkout [BRANCH_NAME] and commit more work to it, then push again, and the PR will be auto-updated. Thus, no need for new PR. Just make sure you go back to master once done.

## A little disclaimer about the workflow mentioned in the article:

Generally, companies use both main and develop branches. Usually, develop branch is mapped to a test deployment server where features are tested before being deployed to production, and the main branch is mapped to the production deployment server. Also, main branch maintains a compressed version history, while develop maintains a full version history of all commits.

For the capstone project purpose, we have simplified the workflow with one branch only - the main branch. So, all individual branches must be created from and merged into main. CI automation will also be set up to run checks when a PR is opened into the main branch.

## Github Project Management

Github project management helps project managers and developers coordinate, track, and update their work in one place, so projects stay transparent and on schedule, learn more about Github project management.

## Github Actions

Continuous integration or “CI” is the practice of merging all developers' working copies to a shared mainline several times a day, learn more about CI in this article and this Wikipedia page.
The CI tool we are going to use is Github Actions. Your project's Github repository will be setup with a workflow that runs linting and formatting checks along with unit tests each time a pull request is opened into the main branch.
You will also have a local CI setup on your project repository using Husky, which will run a pre-commit check for linting and formatting and a pre-push check for linting, formatting, and unit tests.

## Heroku

Heroku is a platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud. Learn more about Heroku here.
After the first 2-3 weeks of coding, when your team's project has reached a stable state your lead engineer will work with you to set up a Heroku account with git-based deployment.
Optionally, you may deploy your application as a Docker container on the cloud.

## MongoDB Atlas

MongoDB Atlas is a fully-managed cloud database that handles all the complexity of deploying, running, and scaling MongoDB in the cloud, in other words, a cloud-based database as a service (DbaaS). Learn more about MongoDB Atlas here.
Along with the cloud deployment for your backend application on Heroku, your lead engineer will work with you to deploy your MongoDB database on the cloud and connect your backend API to it using a secure connection string.

## The other tooling which you are already familiar with includes - Yarn, ESLint, Prettier and Jest.

## Repository Setup

You will be provided with the link for your project's repo on Github. It will include some configuration files essential for CI.
One team member should set up the project folder structure, add configuration files and required packages, and then push the code back.
After this, all team members should clone the repo on their local machines.

## Project structure

### Backend:

Try to follow the MVC project hierarchy for your project structure.
All source code should be inside the src folder.
Test files should end with .test.js and be housed inside **tests** folder in the appropriate locations.
Image files to be used in views can be housed inside a folder called images under src.
All dependencies inside the package.json should be used in the project. Unused dependencies must be removed.
Your project hierarchy should look something similar to this 👇

```
├── src
    ├── controllers
        ├── users.js
        ├── posts.js
        ├── __tests__
            ├── users.test.js
    ├── models
        ├── users.js
        ├── posts.js
    ├── routes
        ├── users.js
        ├── posts.js
        ├── index.js
    ├── services
        ├── cronJobs.js
        ├── jobProcessor.js
    ├── utils
        ├── email.js
    ├── views
        ├── home.ejs
        ├── styles.css
```

### Frontend:

depending on what flow to take
Follow the component pages pattern, so your two main folders inside the src will be the components folder that will contain your components and pages that will contain pages components. You can read more about pages components here or you can ask you team leader about it for more clarity.
You can use postcss if you are going with another library that uses something like tailwindcss

The main folder names inside the src should be lower case like components and containers or pages other folders inside them should be TitleCase like ProgressBar and files inside these folder will be TitleCase too like ProgressBar.js. If you need styles then add them with the same .js file name like ProgressBar.css

Your project hierarchy should look something similar to this:

```
├── src
    ├── components
        ├── ProgressBar
            ├── ProgressBar.js
            ├── ProgressBar.scss
    ├── Pages
        ├── About
            ├── ContactForm.js
            ├── About.js
    ├── style
        ├── _variables.scss
```

All dependencies inside the package.json should be used in the project.
It's recommended to use Yarn to install the packages.
General use images should be inside a folder inside src under images and try to use svg as much as possible. Component specific images should be under their folders.
You should have prettier extension installed and make sure your code is well formatted before submitting it.
Test files will reside under the test folder inside the src and the extension is .test.js

## Git

### Pull Requests

Good pull requests, whether patches, improvements or new features are required to keep our project happy, healthy, and wise. They should remain focused in scope and avoid containing unrelated commits.

Here is a summary of the steps to follow:

1. All working branches must be created from the main branch and all pull requests must be made into this branch. Refer the branch naming guidelines below.
   ```
   $ git checkout -b <working-branch-name>
   ```
2. Make sure to pull all the latest changes regularly to keep your working branch in sync and updated.
   ```
   $ git pull origin main
   ```
3. Follow the commit message guidelines below while making your commits.
4. Open a Pull Request with a clear title and description. The title should give an overview of the feature, change or fix while the description must give elaborated details of the same.
5. Make sure to mark at least 2 reviewers on your pull request. This will include the trainer assigned as code reviewer for your team and a peer from your team.
6. For ambitious tasks, open a Draft Pull Request as soon as possible with the [WIP] prefix in the title, in order to get continuous feedback and help from the team. Mark the PR as Ready To Merge and remove the prefix when you've completed the task.

Don't forget to pull and merge the main branch frequently into your working branches. While your PR is in review, another PR may get merged into main. Frequent pulls from main ensure that you have all the latest changes from your teammates and avoid too many merge conflicts or dependency issues.

### Naming Branches

Use kebab-case while naming your branches. All words must be in lowercase and separated by hyphens with an optional prefix. For example, login-api or feature/login-api or fix/login-api.
Alternatively, you can use the GitHub Pull Requests and Issues extension that creates the branches and unify its naming convention by linking it to an issue.

### Commit Messages

1. Clear & Concise Commits

   - Each commit should correspond to a specific functional change.
   - Ideally, a commit should not create an inconsistent state (such as test errors, linting errors, partial fix, etc.)
   - A complex feature should be broken down into multiple commits as long as each one keeps a consistent state and consists of a self-contained change.
   - Avoid using git add . or git commit -am while committing changes, rather add only the relevant files to your commit.
   - Maintain a practice of committing regularly/daily as you cross milestones of your task.
   - Make sure you do not add any build files, node_modules, or sensitive config files to your commits.

2. Commit message format

   - A commit must be one of the following types:
     - Build: Changes that affect the build system or external dependencies (examples: Dockerfile, docker-compose.yml, package.json)
     - CI: Changes to our CI configuration files and scripts (examples: .eslintrc.json, .prettierrc.json, .lintstagedrc)
     - Doc: Documentation only changes (example: README.md)
     - Feat: A new feature
     - Fix: A bug fix
     - Perf: A code change that improves performance
     - Refactor: A code change that neither fixes a bug nor adds a feature, but refactors a previous piece of code
     - Style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
     - Test: Adding missing tests or correcting existing tests
   - A good commit message starts with one of the following verbs:
     - add feature x
     - remove feature y
     - update feature z
     - refactor function x
     - fix crazy bug
     - revert previous change
   - Or any other verb that clearly indicates the type of change being made.
   - Always use the verbs in Imperative Present tense. Don’t use Past or Present Continuous tenses for commits.
   - Don’t capitalize the first letter of the verb and no dot (.) at the end of the commit message.

3. Tagging Issues
   - If your commit is related to an existing issue listed on the repo, you can tag it using the issue number in your commit message. For example, fix wrong password login bug #23 where 23 is the related issue number.
   - If your commit completely fixes or resolves an existing issue listed on the repo, you can auto-close it with a reference. For example, fix wrong password login bug, close #23.
   - You can also link your pull requests to issues instead of your commits. You can link issues manually once you've opened a pull request.

## The Code

- The code should be totally clean and checked line by line before committing and pushing.
- You shouldn't leave any unnecessary comments in the code.
- Don't leave any console log statements inside the code.
- All variables should be const except for specific cases where you will need to use let.
- Variables should use the camelCase naming convention.
- Make sure your naming is right and not confusing i.e. the Navbar shouldn't be named header or when you fetch movies your function should return movies not data.
- Make sure you clean your imported modules or files that you don't use before committing. The same goes for any variable, function, or piece of code not used.
- Don't repeat yourself (DRY). Make sure the code you write is reusable and reduces repetition as much as possible. For example, don't write two functions that do the same or almost the same job.
- There are some further good programming principles that we will focus on during our work.

## Code Reviews

- Every piece of code that is merged in needs to be reviewed. Ideally, it will also have a test, that will indicate to the reviewer both what the purpose of the code is and provide safety while five people simultaneously work on the codebase.
- Each piece of code will have at least two reviewers; you are required to assign them. One is a trainer; the other is one of your teammates.
- If you are requested to review someone's code, please review it within 1 business day.
- If you are requested to change something about the code, please change it within 1 business day.
- You may optionally have a discussion within your team on these topics.
- Failure to read these will immediately be evident in the way that your code reviews are sent and consequently will affect your evaluation.
- We would like to emphasize a few particular points:
  - Isolation and small changes: Please make merge requests isolated (a merge request should ideally not really do more than one thing at once, the exception being some of the initial ones to set up the repo).
  - Timeliness: If your work is due at the end of a sprint, note that a code review can take three to four reviews to get in. At 24 hours per round of back and forth, this means that waiting on a code review is not an excuse for missing a deadline!
  - When something is due on Wednesday, it does not mean that you sent out a code review by Wednesday. It means that you wrote code of approval-quality that was merged into the repo on Wednesday.
  - Accepting feedback: Do not take code review personally. Learn from your mistakes and improve. Never repeat the same mistake more twice.

### The Process

- Ideally, every code review should have a test. With the exception of boilerplate code, no code reviews for new features will be accepted without a corresponding test file. Practice test-driven development as you work on your assigned tasks.

## Bug Bash and Quality Standards

### What is a bug bash?

- In the later weeks of the projects, as you've fleshed out a working project, frequent bug bashes will be required. A bug bash is what it sounds like: everyone meets (together), sits down to "bash" the application and records a list of bugs and fixes.
- In a bug bash, you should be inspecting your application with immense detail. The evaluation should be quite harsh and focus on all the nitty-gritty and edge cases.
- It should be noted that at a normal company a bug bash would be performed with all groups of people (product managers, designers, engineers, managers, etc.); in this case, the responsibility will fall upon you to objectively evaluate your app. Your lead engineer may join for some bug bashes.

### When do we bug bash?

- It should be done at a minimum once a week during the two weeks approaching demo day. However, you may feel free to do it earlier in the project timeline or more frequently each week.

## Sprint Planning and Meeting Dynamic

- The team with the lead engineer will have sprint planning at the beginning of the week, and a retrospective at the end of it.
- Github project management will be used for sprint planning.
- The team with the lead engineer will have daily standups, 2 calls, and 3 on slack.
- Each team is expected to meet outside of the regular meetings.
- The standups should be short and straightforward, e.g. answers to the questions: what did you do yesterday, what are you working on today, and what blockers are you facing without talking about how to solve the blockers.
- The whole meeting is 10 minutes so you are expected to be on time for the meeting, it reflects your professionalism and commitment.
- Learn more about scrum standups meetings, scrum in software development, scrum meeting best practices, sprints, sprint planning, and sprint retrospective.

## Logistics

- Everyone should be in the daily standup call. If you are going to miss it, please send a message in advance in the project slack channel saying you won't be there and tag your team leader too.
- Any issue between team members must be communicated to the team leader and to the person you have an issue with. If you're a bit worried about giving feedback to a peer, that's normal. We recommend that you check out this resource on how to give good direct feedback which shows that you care.
- If you think you aren't going to finish a task on time, it's good practice to communicate this to the team leader as soon as possible. At the end of the day, communication is everything and there is no such thing as over-communication.

## Testing

Why test?

There are many reasons to have automated tests in your repository, which you have already learned about in the bootcamp. Some of the salient ones:

Code safety: In addition to simply knowing that the code works, developers feel safe changing other people's code and knowing what will happen; if something is changed badly, a test will break.
Ease of review: When reviewing a merge request, the reviewer can understand exactly what was changed by looking at the tests.
Self-documentation: Tests are a form of self-documentation on what the expected behavior of the code is.
The Process

Ideally, every code review should have a test. With the exception of boilerplate code, no code reviews for new features will be accepted without a corresponding test file. Practice test-driven development as you work on your assigned tasks.

## Further Readings

- [Google Code Review Overview](https://google.github.io/eng-practices/review/)
- [Google Code Review Developer Guide](https://google.github.io/eng-practices/review/developer/)
- [Google Code Review Reviewer Guide](https://google.github.io/eng-practices/review/reviewer/)
