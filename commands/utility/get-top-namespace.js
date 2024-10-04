const { SlashCommandBuilder } = require('discord.js');
//get the (up to 25) biggest



module.exports = {
    data: new SlashCommandBuilder()
        .setName('get-top-namespace')
        .setDescription('Provides the top namespaces by blob size')
        .addIntegerOption(option =>
            option.setName('limit')
                .setDescription('The number of elements in the list')
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(25)),
    async execute(interaction) {
        const limit = interaction.options.getInteger('limit');
        var myHeaders = new Headers();
        myHeaders.append("User-Agent", "Apidog/1.0.0 (https://apidog.com)");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        
        const url = "https://api-mocha.celenium.io/v1/namespace?limit=" + limit + "&offset=0&sort=desc&sort_by=size";
        console.log(url);

        await interaction.deferReply();

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(response => {
                let output = "";
                response.forEach((namespace, index) => {
                    if (index < limit) {
                        const position = index === 0 ? "biggest" : 
                                         index === 1 ? "2nd" : 
                                         index === 2 ? "3rd" : 
                                         `${index + 1}th`;
                        output += `The ${position} is: ${namespace.name} with blob count of ${namespace.blobs_count} and size ${namespace.size}.\n`;
                    }
                });
                return interaction.editReply(output || "No data found.");
            })
            .catch(error => {
                console.log('error', error);
                return interaction.editReply("An error occurred while fetching the data.");
            });
    }
};