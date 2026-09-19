const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("random-word")
    .setDescription("Fetching a random word!"),
  async execute(interaction) {
    await interaction.deferReply();
    const response = await fetch("https://random-word-api.herokuapp.com/word");
    const data = await response.json();
    console.log(reply);
    await interaction.editReply(`Random Word: **${data[0]}**`);
  },
};
