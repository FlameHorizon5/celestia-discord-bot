require("dotenv/config")

const fs = require('node:fs');
const path = require('node:path');
const {Client, Collection, Events, GatewayIntentBits, SlashCommandBuilder} = require('discord.js');

const token = process.env.DISCORD_TOKEN;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
    ],
});

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands'); // helps to construct a path to the commands directory
const commandFolders = fs.readdirSync(foldersPath); // reads the path to the directory and returns array of all the folder names it contains

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder); 
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')); // reads the path to the directory and returns an array of all the file names they contain, array.filter() removes any non-js files from the array
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        // set a new item in the collection with the key as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) { // checks if at least the `data` and `execute` properties for each file loaded, prevents errors stemming from unfinished or incorrect command files 
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

client.once(Events.ClientReady, c => {
    console.log(`Logged in as ${c.user.tag}`);

})

client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) return;
    
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was GuildForumThreadManager.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true});
        }
    }
});

client.login(token);