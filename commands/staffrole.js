const Eris = require("eris");
const arkdb = require('ark.db');

module.exports.run = async (client, message, args) => {
	let indexi;
	const db = client.db
	
	function colorToSignedBit(s) {
		return (parseInt(s.substr(1), 16) << 8) / 256;
	}
	
	const dil = db.fetch(`dil_${message.guildID}`) || "english";
	const guild = client.guilds.get(message.guildID)
	
	if (dil == "english") {
		
		if (!message.member.permissions.has('administrator')) return message.channel.createMessage(`You must have Administrator permission to use this command.`)
		if (!args[0]) return message.channel.createMessage(`You must provide an option. (\`add\`, \`remove\` or \`list\`)`)
		if (args[0] == "add") {
			const channel = message.roleMentions[0] || args.slice(1).join(' ')
			if (!channel) return message.channel.createMessage(`You must write a role name, mention a role, write a role ID.`)
			let kanal;
			if (message.roleMentions[0]) kanal = message.roleMentions[0]
			if (!message.roleMentions[0] && !isNaN(channel)) kanal = guild.roles.get(channel)
			if (!message.roleMentions[0] && isNaN(channel)) kanal = guild.roles.find(c => c.name.toLowerCase().split(' ').join('').includes(channel.toLowerCase().split(' ').join('')))
			if (!kanal) return message.channel.createMessage(`Can't find a role with this ID/name.`)
			if (db.has(`staffrole_${message.guildID}`) && db.fetch(`staffrole_${message.guildID}`).includes(kanal.id)) return message.channel.createMessage(`This guild already has this staff role.`)
			db.push(`staffrole_${message.guildID}`, kanal.id)
			message.channel.createMessage(`Successfully added the staff role ${kanal.mention} in this server!`)
		}
		
		if (args[0] == "remove") {
			const channel = message.roleMentions[0] || args.slice(1).join(' ')
			if (!channel) return message.channel.createMessage(`You must write a role name, mention a role, write a role ID.`)
			let kanal;
			if (message.roleMentions[0]) kanal = message.roleMentions[0]
			if (!message.roleMentions[0] && !isNaN(channel)) kanal = guild.roles.get(channel)
			if (!message.roleMentions[0] && isNaN(channel)) kanal = guild.roles.find(c => c.name.toLowerCase().split(' ').join('').includes(channel.toLowerCase().split(' ').join('')))
			if (!kanal) return message.channel.createMessage(`Can't find a role with this ID/name.`)
			if (!db.has(`staffrole_${message.guildID}`) || !db.fetch(`staffrole_${message.guildID}`).includes(kanal.id)) return message.channel.createMessage(`This guild doesn't have this staff role.`)
			const array = db.fetch(`staffrole_${message.guildID}`);
			array.splice(array.indexOf(kanal.id), 1)
			db.set(`staffrole_${message.guildID}`, array)
			if (db.fetch(`staffrole_${message.guildID}`).length == 0) db.delete(`staffrole_${message.guildID}`)
			message.channel.createMessage(`Successfully removed the staff role ${kanal.mention} in this server!`)
		}
		
		if (args[0] == "list") {
			if (!db.has(`staffrole_${message.guildID}`) || db.fetch(`staffrole_${message.guildID}`).length == 0) return message.channel.createMessage(`This guild doesn't have any staff role.`)
			const staffroles = db.fetch(`staffrole_${message.guildID}`)
			const rolemap = staffroles.map(r => `<:rightarrow:709539888411836526> <@&` + r + `>\n`).join('')
			message.channel.createMessage({
				embed: {
					title: `__**Staff roles**__`,
					description: rolemap,
					footer: {
						text: client.user.username,
						icon_url: client.user.avatarURL || client.user.defaultAvatarURL
					},
					color: colorToSignedBit("#2F3136")
				}
			})
		}
		
		if (args[0] != "add" && args[0] != "remove" && args[0] != "list") return message.channel.createMessage(`You must provide a correct option. (\`add\`, \`remove\` or \`list\`)`)
	}
	
	if (dil == "turkish") {
		
		if (!message.member.permissions.has('administrator')) return message.channel.createMessage(`Bu komudu kullanmak i??in Y??netici yetkisine sahip olmal??s??n.`)
		
		if (!args[0]) return message.channel.createMessage(`Bir ayar belirtmelisin. (\`ekle\`, \`sil\` veya \`liste\`)`)
		if (args[0] == "ekle") {
			const channel = message.roleMentions[0] || args.slice(1).join(' ')
			if (!channel) return message.channel.createMessage(`Bir rol ismi, rol IDsi yazmal??s??n veya rol etiketlemelisin.`)
			let kanal;
			if (message.roleMentions[0]) kanal = message.roleMentions[0]
			if (!message.roleMentions[0] && !isNaN(channel)) kanal = guild.roles.get(channel)
			if (!message.roleMentions[0] && isNaN(channel)) kanal = guild.roles.find(c => c.name.toLowerCase().split(' ').join('').includes(channel.toLowerCase().split(' ').join('')))
			if (!kanal) return message.channel.createMessage(`Bu ID/isim ile herhangi bir rol bulunamad??.`)
			if (db.has(`staffrole_${message.guildID}`) && db.fetch(`staffrole_${message.guildID}`).includes(kanal.id)) return message.channel.createMessage(`Bu sunucunun zaten b??yle bir yetkili rol?? var.`)
			db.push(`staffrole_${message.guildID}`, kanal.id)
			message.channel.createMessage(`Ba??ar??yla bu sunucudaki yetkili rollerine ${kanal.mention} eklendi!`)
		}
		
		if (args[0] == "sil") {
			const channel = message.roleMentions[0] || args.slice(1).join(' ')
			if (!channel) return message.channel.createMessage(`Bir rol ismi, rol IDsi yazmal??s??n veya rol etiketlemelisin.`)
			let kanal;
			if (message.roleMentions[0]) kanal = message.roleMentions[0]
			if (!message.roleMentions[0] && !isNaN(channel)) kanal = guild.roles.get(channel)
			if (!message.roleMentions[0] && isNaN(channel)) kanal = guild.roles.find(c => c.name.toLowerCase().split(' ').join('').includes(channel.toLowerCase().split(' ').join('')))
			if (!kanal) return message.channel.createMessage(`Bu ID/isim ile herhangi bir rol bulunamad??.`)
			if (!db.has(`staffrole_${message.guildID}`) || !db.fetch(`staffrole_${message.guildID}`).includes(kanal.id)) return message.channel.createMessage(`Bu sunucunun b??yle bir yetkili rol?? yok.`)
			const array = db.fetch(`staffrole_${message.guildID}`);
			array.splice(array.indexOf(kanal.id), 1)
			db.set(`staffrole_${message.guildID}`, array)
			if (db.fetch(`staffrole_${message.guildID}`).length == 0) db.delete(`staffrole_${message.guildID}`)
			message.channel.createMessage(`Ba??ar??yla bu sunucunun yetkili rollerinden ${kanal.mention} kald??r??ld??!`)
		}
		
		if (args[0] == "liste") {
			if (!db.has(`staffrole_${message.guildID}`) || db.fetch(`staffrole_${message.guildID}`).length == 0) return message.channel.createMessage(`Bu sunucunun hi??bir yetkili rol?? yok.`)
			const staffroles = db.fetch(`staffrole_${message.guildID}`)
			const rolemap = staffroles.map(r => `<:rightarrow:709539888411836526> <@&` + r + `>\n`).join('')
			message.channel.createMessage({
				embed: {
					title: `__**Yetkili rolleri**__`,
					description: rolemap,
					footer: {
						text: client.user.username,
						icon_url: client.user.avatarURL || client.user.defaultAvatarURL
					},
					color: colorToSignedBit("#2F3136")
				}
			})
		}
		
		if (args[0] != "ekle" && args[0] != "sil" && args[0] != "liste") return message.channel.createMessage(`Do??ru bir ayar belirtmelisin. (\`ekle\`, \`sil\` veya \`liste\`)`)
	}
}

module.exports.help = {
	name: "staffrole",
	nametr: "yetkilirol",
	aliase: [ "setstaff", "setstaffrole", "yetkilirol", "yetkilirolse??" ],
	descriptionen: "Sets a staff role to manage suggestions. (if not selected, required permission for staff roles is Manage Messages)",
	descriptiontr: "??nerileri y??netecek bir yetkili rol?? se??er. (se??ilmediyse, yetkililer i??in gereken yetki Mesajlar?? Y??netme olacakt??r)",
	usageen: "setstaffrole [role name, mention or id]",
	usagetr: "yetkilirol [rol ismi, etiketi veya idsi]",
	category: 'admin'
}
