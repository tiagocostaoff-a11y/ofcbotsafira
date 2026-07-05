const { Events, EmbedBuilder, PermissionsBitField } = require("discord.js");

const TIPOS_TICKET = {
    ticket_compras:   { emoji: "🛒", label: "Compras"  },
    ticket_parcerias: { emoji: "💎", label: "Parcerias" },
    ticket_denuncia:  { emoji: "🚨", label: "Denúncia"  },
    ticket_suporte:   { emoji: "🖥️", label: "Suporte"   }
};

module.exports = {
    name: Events.InteractionCreate,

    async execute(interaction, client) {

        // ==========================
        // BOTÕES
        // ==========================
        if (interaction.isButton()) {

            switch (interaction.customId) {

                case "boost_loja":
                    return interaction.reply({
                        content: "🛒 **Loja Oficial do Safira SMP**\n\n🔗 https://lojasafirasmpp.netlify.app/",
                        ephemeral: true
                    });

                case "boost_ticket":
                    return interaction.reply({
                        content: "🎫 **Abra um ticket em:**\n\n<#1519768482441465866>",
                        ephemeral: true
                    });

                case "boost_site":
                    return interaction.reply({
                        content: "🌐 **Site Oficial do Safira SMP**\n\n🔗 https://lojasafirasmpp.netlify.app/",
                        ephemeral: true
                    });

                case "fechar_cancelar":
                    return interaction.update({
                        content: "❌ Fechamento cancelado.",
                        embeds: [],
                        components: []
                    });

                case "fechar_confirmar": {
                    await interaction.update({
                        content: "🗑️ Deletando canal em 5 segundos...",
                        embeds: [],
                        components: []
                    });
                    setTimeout(() => {
                        interaction.channel.delete().catch(console.error);
                    }, 5000);
                    return;
                }

                case "ticket_compras":
                case "ticket_parcerias":
                case "ticket_denuncia":
                case "ticket_suporte": {

                    const tipo      = TIPOS_TICKET[interaction.customId];
                    const username  = interaction.user.username.toLowerCase().replace(/[^a-z0-9]/g, "");
                    const nomeCanal = `${tipo.emoji}・${username}`;

                    const existente = interaction.guild.channels.cache.find(
                        c => c.name === nomeCanal
                    );

                    if (existente) {
                        return interaction.reply({
                            content: `❌ Você já tem um ticket aberto: ${existente}`,
                            ephemeral: true
                        });
                    }

                    try {
                        const canal = await interaction.guild.channels.create({
                            name: nomeCanal,
                            type: 0,
                            permissionOverwrites: [
                                {
                                    id: interaction.guild.id,
                                    deny: [PermissionsBitField.Flags.ViewChannel]
                                },
                                {
                                    id: interaction.user.id,
                                    allow: [
                                        PermissionsBitField.Flags.ViewChannel,
                                        PermissionsBitField.Flags.SendMessages,
                                        PermissionsBitField.Flags.ReadMessageHistory
                                    ]
                                },
                                {
                                    id: client.user.id,
                                    allow: [
                                        PermissionsBitField.Flags.ViewChannel,
                                        PermissionsBitField.Flags.SendMessages,
                                        PermissionsBitField.Flags.ReadMessageHistory,
                                        PermissionsBitField.Flags.ManageChannels
                                    ]
                                }
                            ]
                        });

                        const embedBemVindo = new EmbedBuilder()
                            .setColor("#00E5FF")
                            .setTitle(`${tipo.emoji} Ticket — ${tipo.label}`)
                            .setDescription(`Olá, ${interaction.user}! 👋\n\nBem-vindo ao seu ticket de **${tipo.label}**.\nDescreva sua situação com o máximo de detalhes possível e a equipe irá te atender em breve.\n\n> 🔒 Apenas você e a staff podem ver este canal.`)
                            .setFooter({ text: "SafiraSMP • Tickets" })
                            .setTimestamp();

                        await canal.send({
                            content: `${interaction.user}`,
                            embeds: [embedBemVindo]
                        });

                        return interaction.reply({
                            content: `✅ Ticket criado com sucesso! ${canal}`,
                            ephemeral: true
                        });

                    } catch (err) {
                        console.error("Erro ao criar ticket:", err);
                        return interaction.reply({
                            content: "❌ Não consegui criar o ticket. Verifique se o bot tem permissão de **Gerenciar Canais**.",
                            ephemeral: true
                        });
                    }
                }

            }

            return;
        }

        // ==========================
        // COMANDOS SLASH
        // ==========================
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {

            await command.execute(interaction);

        } catch (error) {

            console.error(error);

            if (interaction.replied || interaction.deferred) {

                await interaction.followUp({
                    content: "❌ Ocorreu um erro ao executar este comando.",
                    ephemeral: true
                });

            } else {

                await interaction.reply({
                    content: "❌ Ocorreu um erro ao executar este comando.",
                    ephemeral: true
                });

            }

        }

    }

};
