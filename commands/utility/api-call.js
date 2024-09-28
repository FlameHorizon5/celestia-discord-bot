const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('api-call')
        .setDescription('Calls the API with the provided input')
        .addStringOption(option =>
            option.setName('call')
            .setDescription('The call you wish to make')
            .setRequired(true)),
    async execute(interaction) {
        const call = interaction.options.getString('call')

        var myHeaders = new Headers();
        myHeaders.append("User-Agent", "Apidog/1.0.0 (https://apidog.com");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        
        const url = "https://api-mocha.celenium.io/v1/" + call;

        console.log(url);

        fetch(url, requestOptions)
            .then(response => response.text())
            .then(result => interaction.reply("```" + result + "```"))
            .catch(error => console.log('error', error));

    } };