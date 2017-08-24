# Probot: Linter

> a GitHub Integration built with [probot](https://github.com/probot/probot) that lints and fixes code in Pull Requests.

<img width="783" alt="screen shot 2017-07-25 at 10 08 38 pm" src="https://user-images.githubusercontent.com/13410355/28605333-ef0701d2-7185-11e7-984c-88a3ffea4c87.png">

<img width="1018" alt="screen shot 2017-07-25 at 10 10 53 pm" src="https://user-images.githubusercontent.com/13410355/28605378-2d327fa4-7186-11e7-891e-2d3556ab345e.png">

## Usage


1. Install the bot on the intended repositories. The plugin requires the following **Permissions and Events**:
  - Repository Contents: **Read & Write**
    - [x] check the box for **Push** events
2. Optionally, you can add a `.github/linter.yml` file that contains the following optionally editable fields:

```yml
# Configuration for linter - https://github.com/probot/linter

# a whitList of files the linter will NOT be applied to
whiteList:
  - index.js
  - config.js

# Options to be passed into the javascript standard linter
# More documentation on what is acceptable here can be found in the standard docs here: https://github.com/standard/standard#standardlinttexttext-opts-callback
globals: []  # custom global variables to declare
plugins: []  # custom eslint plugins
envs: []     # custom eslint environment

```

## Setup

```
# Install dependencies
npm install

# Run the bot
npm start
```

See [docs/deploy.md](docs/deploy.md) if you would like to run your own instance of this plugin.
