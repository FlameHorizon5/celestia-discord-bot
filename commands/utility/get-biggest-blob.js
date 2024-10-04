const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');



module.exports = {
    data: new SlashCommandBuilder()
        .setName('get-biggest-blob')
        .setDescription('Returns the biggest blob on a namespace in the last 24H'),
    async execute(interaction) {
        const timeInterval = (Date.now() - (60 * 60 * 24 * 1000))
        console.log(timeInterval);

        var myHeaders = new Headers();
        myHeaders.append("User-Agent", "Apidog/1.0.0 (https://apidog.com");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        
        const url = "https://api-mocha.celenium.io/v1/blob?limit=10&offset=0&sort=desc&sort_by=size&from=" + timeInterval + "&to=" + Date.now();

        console.log(url);

        fetch(url, requestOptions)
            .then(response => response.text())
            .then(result => interaction.reply("```" + result + "```"))
            .catch(error => console.log('error', error));


}};