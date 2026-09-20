const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("random-word")
    .setDescription("Fetching a random word!"),
  async execute(interaction) {
    await interaction.deferReply();
    const response = await fetch("https://random-word-api.herokuapp.com/word"),
      data = await response.json(),
      reply = `Random word: **${data[0]}**`;
    await interaction.editReply(reply);
  },
};
