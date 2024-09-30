# celestia-discord-bot
Discord bot powered by Celenium API
** Warning **: this is a work in progress and currently only for demo purposes, therefore it only makes free, testnet api calls.

## Overview

An educational discord bot that can make api calls.

### Ideas behind this app

-  Discord is used as a way to communicate and coordinate easily by indie coders and small groups of developers.
-  Celestia has a big community discord, where people have dedicated developer channels to ask questions.
-  A bot that could aid people envisioning api calls would be helpful for developers to explain things to eachother through discord messages.
-  Developers can use it in their own discord servers as an api testing app, before writing their own code.
-  If a developer has an idea and wants to test it, they could do so on any device that can use discord, for example, while outside on a phone.

## Command list

### `api-call`

A generic command that can call virtually any API endpoint by appending the input provided by the user to the end of `https://api-mocha.celenium.io/v1/`, for example, a user wants to get a list of addresses, all they have to do is call `/api-call` and when the bot asks for input, input `address`, making the bot return the response to `https://api-mocha.celenium.io/v1/address`


### `get-top-namespace`

A command that returns the top namespaces, by size. To use, all the user needs to do is do the command `/get-top-namespace` and then insert the amount of namespaces they want on their list, up to 25, the bot will then provide the namespace's places in the podium, as well as the their names, their size, and their blob count.




  
    
