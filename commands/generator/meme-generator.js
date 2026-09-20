const fs = require("node:fs");
const path = require("node:path");
const {
  SlashCommandBuilder,
  AttachmentBuilder,
  EmbedBuilder,
} = require("discord.js");
const { randomArray } = require("../../utilities");

const rootPath = process.cwd();
const foldersPath = path.join(rootPath, "assets", "kaito_meme");

const memeImages = () => {
  return fs.readdirSync(foldersPath);
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("meme-generator")
    .setDescription("Generates random KAITO meme"),

  async execute(interaction) {
    await interaction.deferReply();

    const randomMemeImage = randomArray(memeImages());

    const memeImage = new AttachmentBuilder(
      path.join(foldersPath, randomMemeImage),
      {
        name: "meme_image.jpg",
      },
    );

    const embed = new EmbedBuilder()
      .setTitle("Random KAITO Meme")
      .setDescription(randomMemeImage)
      .setColor("#ADD8E6")
      .setImage("attachment://meme_image.jpg");

    await interaction.editReply({
      embeds: [embed],
      files: [memeImage],
    });
  },
};
