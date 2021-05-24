// let's go
const Discord = require('discord.js');
const { 
  token, 
  prefix,
  botName
} = require('./config.json');
const client = new Discord.Client();
const command = require('./cmd')
const test = require('./msg')


client.on('ready' , () => {
    console.log('Ready!');

    command(client, 'help', (message) => {
        const realHelp = "\n`?avatar: getting any avatar you want.`\n`?cc: for clear messages.`\n`?serverinfo: for server information.`\n`?c-voice: create a voice channel.`\n`?c-text: create a text channel.`\n`?ban: for ban someone.`\n`?kick: for kick someone.`\n`?serverinfo: show info about this server.`\n`?user: get info about any user you want.`\n`?botinfo: get info about this bot.`\n`?invite: invite me to your server (YAY THANKS!).`\n`?roles: show all server roles.`\n`?lock: lock a channel`\n`?unlock: unlock a channel.`\n`"
        const date = new Date().toLocaleDateString('en-us')
        const embed = new Discord.MessageEmbed()
        .setTitle(`**Welcome To ${botName}**.\nHelp For ${botName}`)
        .setDescription(realHelp)
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setFooter(`Created By Tyizo | ${date}`)
        .setColor('RANDOM')
        const userAuthor = message.author.toString()

        message.react('👀')
        message.channel.send(`**Check your DM ${userAuthor} **`)
        message.author.send(embed)

      })
    
    
      client.user.setPresence({
        activity: {
          name: `"${prefix}help" for help`,
        },
      })

    command(client, ['cc', 'clear'], message => {
        const { member } = message

        const tag = `<@${member.id}>`

    if (member.hasPermission('ADMINISTRATOR')) {
        message.channel.messages.fetch().then((results) => {
            message.channel.bulkDelete(results)
        })
    } else  {
        message.channel.send(`${tag} You do not have permission to use this command. | ليس لديك الصلاحيات`)

    }
      
    })

    command(client, 'c-text', (message) => {
        const { member, mentions } = message

        const tag = `<@${member.id}>`
        
        if (member.hasPermission('ADMINISTRATOR') ) {
            const name = message.content.replace('?c-text ', '')
    
            message.guild.channels
              .create(name, {
                type: 'text',
              })
              .then((channel) => {
                const categoryId = '733965065795010596'
                channel.setParent(categoryId)
              })
              message.channel.send(`Done Created ${name} Text Channel!`)    
        }
        else {
            message.channel.send(`${tag} You do not have permission to use this command. | ليس لديك الصلاحيات`)
          }
    
      })
    
      command(client, 'c-voice', (message) => {
        const { member, mentions } = message

        const tag = `<@${member.id}>`

        if (
            member.hasPermission('ADMINISTRATOR') 
          ) {
            const name = message.content.replace('c-voice ', '')
    
            message.guild.channels
              .create(name, {
                type: 'voice',
              })
              .then((channel) => {
                const categoryId = '733965065795010596'
                channel.setParent(categoryId)
                channel.setUserLimit(10)
              })
              message.channel.send(`Done Created ${name} Voice Channel!`)    
          }
          
          else {
            message.channel.send(`${tag} You do not have permission to use this command. | ليس لديك الصلاحيات`)
        
        }
      })
    
      command(client, 'avatar', (message) => {
        const user = message.mentions.users.first() || message.author;

        const embed = new Discord.MessageEmbed()
        .setTitle('**Download**')
        .setDescription(`${user.tag} Avatar!`)
        .setURL(user.displayAvatarURL())
        .setFooter(message.author.tag, message.author.displayAvatarURL())
        .setImage(user.displayAvatarURL({size: 4096 , dynamic: true}))
        .setColor('RANDOM')
        

        message.channel.send(embed)
  })

  command(client, 'serverinfo', (message) => {
    const { guild } = message

    const { name, region, memberCount, owner, afkTimeout } = guild
    const icon = guild.iconURL()

    const embed = new Discord.MessageEmbed()
      .setTitle(`Server info for "${name}"`)
      .setThumbnail(icon)
      .addFields(
        {
          name: 'Region',
          value: region,
        },
        {
          name: 'Members',
          value: memberCount,
        },
        {
          name: 'Owner',
          value: owner.user.tag,
        },
        {
          name: 'AFK Timeout',
          value: afkTimeout / 60,
        }
      )
    .setColor('RANDOM')
    message.channel.send(embed)
  })

  command(client, 'ban', (message) => {
    const { member, mentions, args } = message

    const tag = `<@${member.id}>`

    if (
      member.hasPermission('ADMINISTRATOR') ||
      member.hasPermission('BAN_MEMBERS')
    ) {
      const target = mentions.users.first()
      if (target) {
        const targetMember = message.guild.members.cache.get(target.id)
        targetMember.ban()
        message.channel.send(`${tag} That user has been`)
      } else {
        message.channel.send(`${tag} Please specify someone to ban.`)
      }
    } else {
      message.channel.send(
        `${tag} You do not have permission to use this command. | ليس لديك الصلاحيات`
      )
    }
  })

  command(client, 'kick', (message) => {
    const { member, mentions } = message

    const tag = `<@${member.id}>`

    if (
      member.hasPermission('ADMINISTRATOR') ||
      member.hasPermission('KICK_MEMBERS')
    ) {
        const target = mentions.users.first()
      if (target) {
            const targetMember = message.guild.members.cache.get(target.id)
            targetMember.kick()
        message.channel.send(`${tag} That user has kicked`)
      } else {
        message.channel.send(`${tag} Please specify someone to kick.`)
      }
    } else {
      message.channel.send(
        `${tag} You do not have permission to use this command. | ليس لديك الصلاحيات`
        )
    }
  })

  command(client, ['info' , 'botinfo' , 'bot'] , message => {
    const embed = new Discord.MessageEmbed()
    .setTitle('Bot info')
    .setColor('RANDOM')
    .setFooter('By Tyizo | Github: tyizo.')
    .setThumbnail(client.user.displayAvatarURL())
    .addFields(
        {
            name: "Total Guilds: ",
            value: `${client.guilds.cache.size} Guilds`,
            inline: true
        },
        {
            name: "Total Users: ",
            value: `${client.users.cache.size} Users`,
            inline: true
        },
        {
            name: "Total Channels: ",
            value: `${client.channels.cache.size} Channels`,
            inline: true
        },
        {
          name: "Developed In JavaScript",
          value: 'And NodeJS',
          inline: true
        },
        {
            name: "Source",
            value: `[Link](https://github.com/tyizo/simple-bot-discord)`,
            inline: true
        }
    )
    message.channel.send(embed)

})

  command(client, 'invite', message => {
    // put your bot id:
    const bot_id = '780455560645705740' 
    const embed = new Discord.MessageEmbed()
    .setTitle(`${client.user.username} Invite`)
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${bot_id}&permissions=8&scope=bot`)
    .setColor('RANDOM')
    .setDescription('`YAY! Thanks for adding me to your server!.`')
    message.channel.send(embed)

  })

  command(client, ['user', 'userinfo'], message => {
    const { guild, channel } = message

    const user = message.mentions.users.first() || message.member.user
    const member = guild.members.cache.get(user.id)

   // console.log(member)
   let gameName = user.presence.game ? user.presence.game.name : "None";

    const embed = new Discord.MessageEmbed()
      .setAuthor(`User info for ${user.tag}`, user.displayAvatarURL())
      .addFields(
        {
          name: 'User tag: ',
          value: user.tag,
          inline: true
        },
        {
          name: 'Is bot: ',
          value: user.bot,
          inline: true

        },
        {
          name: 'Nickname: ',
          value: member.nickname || 'None',
          inline: true

        },
        {
          name: 'Joined Server: ',
          value: new Date(member.joinedTimestamp).toLocaleDateString(),
          inline: true

        },
        {
          name: 'Joined Discord At: ',
          value: new Date(user.createdTimestamp).toLocaleDateString(),
          inline: true

        },
        {
          name: 'Roles: ',
          value: member.roles.cache.size - 1,
          inline: true

        },
        {
          name: "User id: ",
          value: user.id,
          inline: true
        },
        {
          name: "User Status: ",
          value: gameName,
          inline: true
        },
        {
          name: "Avatar Url",
          value: `[Avatar Link](${user.displayAvatarURL({dynamic: true})})`,
          inline: true
        }
      )
      .setColor('RANDOM')
      .setFooter(message.author.tag, message.author.displayAvatarURL())

    channel.send(embed)

  })


  command(client, ['showroles', 'roles'], message => {
    if (!message.member.hasPermission('MANAGE_ROLES')) {
      const embed = new Discord.MessageEmbed()
      .setTitle('You dont have permission to do this command!')
      .setColor('#ff0000')
      return message.channel.send(embed)
  }
  let rolemap = message.guild.roles.cache.sort((a, b) => b.position - a.position)
  .map(r => r).join("  ,\n")
  if (rolemap.length > 1024) return message.channel.send('there is a lot of roles , i cant show them all.')
  if (!rolemap) return message.channel.send('No roles in this server')

  const embed = new Discord.MessageEmbed()
  .setTitle(`All roles in guild ${message.guild.name}`)
  .addField("Role List: ", rolemap)
  .setColor('RANDOM')
  message.channel.send(embed)
  })

  command(client, 'lock', message => {
    if (!message.member.hasPermission('MANAGE_CHANNELS')) {
			return message.channel.send('You dont have permission to do this command | لا تمتلك الصلاحيات')
		}
		const role = message.guild.roles.cache.find(role => role.name == '@everyone')
		const channelMention = message.mentions.channels.first() || message.channel

		channelMention.updateOverwrite(role, {
			'SEND_MESSAGES': false,
		})
		message.channel.send(`**Successfully locked** ${channelMention}\n`)

  })

  command(client, 'unlock', message => {
    if (!message.member.hasPermission('MANAGE_CHANNELS')) {
			return message.channel.send('You dont have permission to do this command | لا تمتلك الصلاحيات')
		}
		const role = message.guild.roles.cache.find(role => role.name == '@everyone')
		const channelMention = message.mentions.channels.first() || message.channel

		channelMention.updateOverwrite(role, {
			'SEND_MESSAGES': null,
		})
		message.channel.send(`**Successfully unlocked** ${channelMention}\n`)

  })


  command(client, 'unban', message => {
    const mentionMember = message.mentions.users.first() || message.member.user
    if (!message.member.hasPermission('MANAGE_BANS')) {
      return message.channel.send('You dont have permission to do this command!')
  }
  if (!mentionMember) {
    return message.channel.send('Please mention a member to unban!')
}
try {
    message.guild.fetchBans().then(bans => {
        message.guild.members.unban(mentionMember)
    })
    message.channel.send(`Successfully <@${mentionMember}> has been unbanned`)
} catch(e) {
    return message.channel.send(`There was an error \n\n ${e}`)
}

  })
  
})


client.once('reconnecting', () => {
  console.log('Reconnecting!');
 });
 client.once('disconnect', () => {
  console.log('Disconnect!');
 });

 
client.login(token);
// ok that's it
