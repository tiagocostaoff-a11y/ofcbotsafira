const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("loja")
        .setDescription("Visualize os produtos disponíveis na loja do SafiraSMP"),

    async execute(interaction) {
        const guild = interaction.guild;
        const guildIcon = guild.iconURL({ dynamic: true, size: 256 });

        const embed = new EmbedBuilder()
            .setColor("#8A2BE2")
            .setTitle("🛍️ Loja SafiraSMP")
            .setDescription("Confira nossos produtos exclusivos e impulsione sua experiência no servidor!")
            .setThumbnail(guildIcon)
            .addFields(
                {
                    name: "👑 Ranks VIP",
                    value: "• **VIP** — R$ 7,50\n• **PRIME** — R$ 16,99\n• **CRIMSON** — R$ 25,90\n• **AMETHYST** — R$ 45,90",
                    inline: false
                },
                {
                    name: "⛏️ Ferramentas Especiais",
                    value: "• **Picareta 3x3** — R$ 19,90\n• **Machado Lenhador** — R$ 17,90\n• **Pá 3x3** — R$ 14,90",
                    inline: false
                },
                {
                    name: "🔑 Chaves de Acesso",
                    value: "• **Chave Spawner** — R$ 8,90\n• **Chave Prime** — R$ 14,90\n• **Chave Crimson** — R$ 19,90\n• **Chave Amethyst** — R$ 29,90",
                    inline: false
                },
                {
                    name: "💎 Pacotes de Shards",
                    value: "• **1.000 Shards** — R$ 9,90\n• **2.300 Shards** — R$ 19,90\n• **6.000 Shards** — R$ 39,90",
                    inline: false
                }
            )
            .setFooter({
                text: "SafiraSMP • Loja Oficial",
                iconURL: guildIcon
            })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};

