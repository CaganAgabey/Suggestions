const Eris = require("eris");
const arkdb = require('ark.db');

module.exports.run = async (client, message, args) => {
  const db = client.db
  function colorToSignedBit(s) {
    return (parseInt(s.substr(1), 16) << 8) / 256;
}

let dil = db.fetch(`dil_${message.guildID}`) || "english";

if (dil == "english") {

if (!message.member.permissions.has('administrator')) return message.channel.createMessage(`You must have Administrator permission to use this command.`)

  const channel = message.channelMentions[0] || args.join(' ')
  if (!channel) return message.channel.createMessage(`You must write a channel name, mention a channel, write a channel ID or write delete to delete suggestion channel.`)
  if (channel == "delete") {
    if (!db.has(`suggestionchannel_${message.guildID}`)) return message.channel.createMessage(`This guild already doesn't have a suggestion channel.`)
    db.delete(`suggestionchannel_${message.guildID}`)
    return message.channel.createMessage(`Successfully deleted the suggestion channel.`)
  }
  let kanal;
  if (!isNaN(channel)) kanal = client.guilds.find(g => g.id == message.guildID).channels.find(c => c.id == channel)
  if (isNaN(channel)) kanal = client.guilds.find(g => g.id == message.guildID).channels.find(c => c.name.toLowerCase().includes(channel.toLowerCase()))
  if (!kanal) return message.channel.createMessage(`Can't find a channel with this ID/name.`)
  if (kanal.type == 2) return message.channel.createMessage(`You can't set voice channels as suggestion channel.`)
  if (db.has(`suggestionchannel_${message.guildID}`) && db.fetch(`suggestionchannel_${message.guildID}`) == kanal.id) return message.channel.createMessage(`Suggestion channel of this guild is already this channel.`)
  db.set(`suggestionchannel_${message.guildID}`, kanal.id)
  message.channel.createMessage(`Successfully setted the suggestion channel to ${kanal.mention} in this server! Hereafter, when an user sends a text to this channel, that text will count as a suggestion.`)
}

if (dil == "turkish") {

  if (!message.member.permissions.has('administrator')) return message.channel.createMessage(`Bu komudu kullanmak i??in Y??netici yetkisine sahip olmal??s??n.`)
  
    const channel = message.channelMentions[0] || args.join(' ')
    if (!channel) return message.channel.createMessage(`Bir kanal ismi yazmal??s??n, kanal?? etiketlemelisin, kanal IDsi yazmal??s??n veya ??neri kanal??n?? silmek i??in sil yazmal??s??n.`)
    if (channel == "sil") {
      if (!db.has(`suggestionchannel_${message.guildID}`)) return message.channel.createMessage(`Bu sunucunun zaten bir ??neri kanal?? yok.`)
      db.delete(`suggestionchannel_${message.guildID}`)
      return message.channel.createMessage(`??neri kanal?? ba??ar??yla silindi.`)
    }
    let kanal;
    if (!isNaN(channel)) kanal = client.guilds.find(g => g.id == message.guildID).channels.find(c => c.id == channel)
    if (isNaN(channel)) kanal = client.guilds.find(g => g.id == message.guildID).channels.find(c => c.name.toLowerCase().includes(channel.toLowerCase()))
    if (!kanal) return message.channel.createMessage(`Bu ID/isim ile herhangi bir kanal bulunamad??.`)
    if (kanal.type == 2) return message.channel.createMessage(`Sesli kanallar?? ??neri kanal?? olarak se??emezsin.`)
    if (db.has(`suggestionchannel_${message.guildID}`) && db.fetch(`suggestionchannel_${message.guildID}`) == kanal.id) return message.channel.createMessage(`Bu sunucunun ??neri kanal?? zaten bu kanal.`)
    db.set(`suggestionchannel_${message.guildID}`, kanal.id)
    message.channel.createMessage(`??neri kanal?? ba??ar??yla ${kanal.mention} olarak se??ildi! Bundan sonra bir kullan??c?? bu kanala mesaj g??nderirse, bu mesaj ??neri olarak ge??ecektir.`)
  }
}

module.exports.help = {
  name: "setchannel",
  nametr: "kanalse??",
  aliase: ["suggestionchannel", "suggestionchannelset", "setsuggestionchannel", "suggestionsetchannel", "??nerikanal", "??neri-kanal", "??nerikanal??", "??nerikanalse??", "kanalse??"],
  descriptionen: "Sets a channel to send suggestions. (write delete to delete suggestion channel)",
  descriptiontr: "??nerileri g??ndermek i??in bir kanal se??er.",
  usageen: "setchannel [channel name, mention or id]",
  usagetr: "??nerikanal [kanal ismi, etiketi veya idsi]",
  category: 'admin'
}
