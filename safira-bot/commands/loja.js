const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('loja')
    .setDescription('Veja os itens disponíveis na loja do SafiraSMP'),
  
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#00CED1') // Ciano diamante
      .setTitle('💎 LOJA SAFIRA SMP 💎')
      .setDescription('Confira nossos itens exclusivos e premium!')
      .setThumbnail('https://cdn.discordapp.com/icons/1523051231595987004/2923ad01e7664af86a781e0957fd1222.png?size=2048')
      .addFields(
        { 
          name: '👑 RANKS PREMIUM', 
          value: '```\n💙 VIP           R$ 7,50\n💜 PRIME         R$ 16,99\n❤️  CRIMSON       R$ 25,90\n💜 AMETHYST      R$ 45,90\n```', 
          inline: false 
        },
        { 
          name: '⛏️ FERRAMENTAS ESPECIAIS', 
          value: '```\n🔨 Picareta 3x3      R$ 19,90\n🪓 Machado Lenhador  R$ 17,90\n🥄 Pá 3x3            R$ 14,90\n```', 
          inline: false 
        },
        { 
          name: '🔑 CHAVES EXCLUSIVAS', 
          value: '```\n🔓 Chave Spawner     R$ 8,90\n🔓 Chave Prime       R$ 14,90\n🔓 Chave Crimson     R$ 19,90\n🔓 Chave Amethyst    R$ 29,90\n```', 
          inline: false 
        },
        { 
          name: '💠 SHARDS (Moeda Premium)', 
          value: '```\n✨ 1.000 Shards      R$ 9,90\n✨ 2.300 Shards      R$ 19,90\n✨ 6.000 Shards      R$ 39,90\n```', 
          inline: false 
        }
      )
      .setFooter({ 
        text: 'SafiraSMP - Use /comprar [item] para adquirir',
        iconURL: 'https://cdn.discordapp.com/icons/1523051231595987004/2923ad01e7664af86a781e0957fd1222.png?size=2048'
      })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};

