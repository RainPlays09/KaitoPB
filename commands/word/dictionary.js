const {
  SlashCommandBuilder,
  EmbedBuilder,
  AttachmentBuilder,
} = require("discord.js");
const path = require("node:path");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dictionary")
    .setDescription("Fetching the word description")
    .addStringOption((option) =>
      option
        .setName("word")
        .setDescription("Word you want to search")
        .setRequired(true),
    ),
  async execute(interaction) {
    await interaction.deferReply();

    const word = interaction.options.getString("word");

    const imagePath = path.join(__dirname, "../../assets/dictionary_icon.jpg");

    const footerImage = new AttachmentBuilder(imagePath, {
      name: "dictionary_icon.jpg",
    });

    const response = await fetch(
      `https://freedictionaryapi.com/api/v1/entries/en/${word}`,
    );

    const data = await response.json();

    const definitions = data.entries[0].senses
      .map((sense, index) => `${index + 1}. ${sense.definition}`)
      .join("\n");

    const embed = new EmbedBuilder()
      .setTitle(word)
      .setDescription(definitions)
      .setColor("#F5F5DC")
      .setFooter({
        text: "Dictionary",
        iconURL: "attachment://dictionary_icon.jpg",
      });

    await interaction.editReply({ embeds: [embed], files: [footerImage] });
  },
};
