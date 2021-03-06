const Eris = require("eris");
const arkdb = require('ark.db');
const {deleteSuggestion} = require('../functions')

module.exports.run = async (client, message, args) => {
	const db = client.db
	function colorToSignedBit(s) {
		return (parseInt(s.substr(1), 16) << 8) / 256;
	}
	
	let dil = db.fetch(`dil_${message.guildID}`) || "english";
	
	if (dil == "english") {
		
		if (!db.has(`staffrole_${message.guildID}`) && !message.member.permissions.has('manageMessages')) return message.channel.createMessage(`This server didn't set a staff role and you must have MANAGE MESSAGES permission to use this!`)
		if (db.has(`staffrole_${message.guildID}`) && !message.member.roles.some(r => db.fetch(`staffrole_${message.guildID}`).includes(r)) && !message.member.permissions.has('administrator')) return message.channel.createMessage(`You don't have staff role to use this command!`)
		if (!db.has(`suggestionchannel_${message.guildID}`)) return message.channel.createMessage(`This guild even not has a suggestion channel!`)
		const sugid = args[0]
		if (!sugid) return message.channel.createMessage(`You must provide a suggestion number to manage.`)
		if (!db.has(`suggestion_${message.guildID}_${sugid}`)) return message.channel.createMessage(`Can't find a suggestion with this suggestion number in this guild.`)
		if (!client.guilds.get(message.guildID).channels.get(db.fetch(`suggestionchannel_${message.guildID}`))) return message.channel.createMessage(`This guild's suggestion channel has been deleted, so you can't handle suggestions in this guild until setting a new suggestion channel.`)
		if (db.fetch(`suggestion_${message.guildID}_${sugid}.status`) == "awaiting approval") return message.channel.createMessage(`You must verify or delete this suggestion in review channel using emojis before using this command.`)
		if (db.fetch(`suggestion_${message.guildID}_${sugid}.status`) == "deleted") return message.channel.createMessage(`This suggestion was deleted!`)
		deleteSuggestion(message, message.channel.guild, sugid, client, dil, args, false, db.fetch(`suggestion_${message.guildID}_${sugid}.channel`))
	}
	
	if (dil == "turkish") {
		
		if (!db.has(`staffrole_${message.guildID}`) && !message.member.permissions.has('manageMessages')) return message.channel.createMessage(`Bu sunucu bir yetkili rol?? se??medi ve bu komudu kullanmak i??in Mesajlar?? Y??netme yetkisine sahip olmal??s??n!`)
		if (db.has(`staffrole_${message.guildID}`) && !message.member.roles.some(r => db.fetch(`staffrole_${message.guildID}`).includes(r)) && !message.member.permissions.has('administrator')) return message.channel.createMessage(`Bu komudu kullanmak i??in yetkili rol??ne sahip de??ilsin!`)
		if (!db.has(`suggestionchannel_${message.guildID}`)) return message.channel.createMessage(`Bu sunucunun daha bir ??neri kanal?? yok!`)
		const sugid = args[0]
		if (!sugid) return message.channel.createMessage(`Y??netmek i??in bir ??neri numaras?? belirtmelisin.`)
		if (!db.has(`suggestion_${message.guildID}_${sugid}`)) return message.channel.createMessage(`Bu sunucuda bu numara ile herhangi bir ??neri bulunamad??.`)
		if (!client.guilds.get(message.guildID).channels.get(db.fetch(`suggestionchannel_${message.guildID}`))) return message.channel.createMessage(`Bu sunucunun ??neri kanal?? silinmi??, bu sebeple yeni bir ??neri kanal?? se??meden ??nerileri y??netemezsin.`)
		if (db.fetch(`suggestion_${message.guildID}_${sugid}.status`) == "awaiting approval") return message.channel.createMessage(`Bu komudu kullanmadan ??nce ??neriyi do??rulama kanal??nda emojiler ile do??rulamal??s??n veya silmelisin.`)
		if (db.fetch(`suggestion_${message.guildID}_${sugid}.status`) == "deleted") return message.channel.createMessage(`Bu ??neri silinmi??!`)
		deleteSuggestion(message, message.channel.guild, sugid, client, dil, args, false, db.fetch(`suggestion_${message.guildID}_${sugid}.channel`))
	}
}

module.exports.help = {
	name: "delete",
	nametr: "sil",
	aliase: [ "deletesuggestion", "??nerisil", "sil" ],
	descriptionen: "Allows to delete any suggestion.",
	descriptiontr: "Herhangi bir ??neriyi silmenize yarar.",
	usageen: "prefix [new prefix]",
	usagetr: "??nek [yeni ??nek]",
	category: 'staff'
}
