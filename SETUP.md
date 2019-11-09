# Setting up Project Cm

For Project CM to work, you will need your own Github OAuth app to login.
But don't worry, it's very easy! This guide will help you with that.


## Step 1: Create your app
- Head over to (https://github.com/settings/developers)[https://github.com/settings/developers]
- Click the button `New OAuth App`
- Fill the form with:
  - Application name: `Project CM`
  - Homepage URL: `https://codementoring.co`
  - Authorization callback URL: `http://localhost:4000/oauth/github` **(This is the important bit)**
- Click the `Register application` button

## Step 2: Setup your `.env` file
Your `Client ID` and `Client Secret` will now be displayed.

**DO NOT SHARE THIS WITH ANYONE**


Instead, create a `.env` file under:
```
packages/api/.env
```

And paste in the following:

```
GITHUB_APP_ID=your app id
GITHUB_APP_SECRET=your secret
```

## Step 3:
Restart your server, and you should be good to go!
Head over to `localhost:4000/oauth/github` to test out your app.

Happy coding!
