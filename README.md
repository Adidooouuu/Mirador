# Mirador the Discord bot

It will have multiple functionnalities inspired by famous (or less) Discord bots'.

## Entry point

The configured entry point is launchBot.js. Using ```node .``` will call this file by default.
You will be prompted to choose between "dev" and "prod". This part will be improved in a near future.

## Config

For now it is using .env configuration logic only. It might be a choice at the project init when the project will go further.

- Install dependencies with ```npm ci```.
- Rename ```.env.template``` as ```.env``` and fill everything except the "SELECTED_ENV" value.
- Run the bot with ```node .```. Choose between "dev" and "prod".
