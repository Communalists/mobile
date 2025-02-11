# Communalists Mobile

## Quickstart

First, copy and run the following:

```sh
git clone git@github.com:Communalists/mobile.git
cd web
git submodule update --init --recursive
```

This clones the repository and recursively installs the submodule repositories.

Then, go through the below items and follow their installation guides:

- [Docker](https://docs.docker.com/engine/install/)
- [Docker Desktop](https://docs.docker.com/desktop/)
- [Expo Go](https://docs.expo.dev/get-started/set-up-your-environment/)

After installation, run `docker login`.

After login, copy the `.default.env` file and rename it to `.env`, you shouldn't have to change any of the values inside unless you're deploying for production.

Now, go to "Run and Debug" on the left side-bar of your VSCode. It should open the "Run and Debug" menu and at the top the dropdown should automatically say "Full". Click on the green play button and it should start up the application, it should pull up the bottom panel with a terminal displaying the containers being built and ran. If the bottom panel pulls up and it's on "Debug Console", click on "Terminal".

Then, click on the "+" button to the right, on the same row as "Problems", "Output", Debug Console", etc. This should open a new terminal where you then need to run the following:

```sh
npm install

# initializes the database with prisma
npm run init

# generates the typescript types from prisma
npm run generate
```

Then, you can run `npm run start` to start the Expo dev server. To see the application you can open your camera and scan the terminal QR code if you're IOS., this should open in Expo Go. (TODO: Add Android steps). The application should update when you make changes but it doesn't you can press "r" in the terminal and it'll refresh.

After you're done running, click on the red square to stop the application. DO NOT CTRL+C, if you do this won't shut down the Docker containers correctly and might cause your machine to slow down later down the line.
