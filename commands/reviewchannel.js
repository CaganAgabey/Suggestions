const Eris = require("eris");
const arkdb = require('ark.db');

module.exports.run = async (client, message, args) => {
  const db = client.db
  function colorToSignedBit(s) {
    return (parseInt(s.substr(1), 16) << 8) / 256;
}

let prefix = db.fetch(`prefix_${message.guildID}`) || "."

let dil = db.fetch(`dil_${message.guildID}`) || "english";

if (dil == "english") {

if (!message.member.permissions.has('administrator')) return message.channel.createMessage(`You must have Administrator permission to use this command.`)
if (!db.has(`suggestionchannel_${message.guildID}`)) return message.channel.createMessage(`First, you must select a suggestion channel with using \`${prefix}setchannel\` command.`)

  const channel = message.channelMentions[0] || args.join(' ')
  if (!channel) return message.channel.createMessage(`You must write a channel name, mention a channel, write a channel ID or write delete to delete review channel.`)
  if (channel == "delete") {
    if (!db.has(`reviewchannel_${message.guildID}`)) return message.channel.createMessage(`This guild already doesn't have a review channel.`)
    db.delete(`reviewchannel_${message.guildID}`)
    return message.channel.createMessage(`Successfully deleted the review channel.`)
  }
  let kanal;
  if (!isNaN(channel)) kanal = client.guilds.find(g => g.id == message.guildID).channels.find(c => c.id == channel)
  if (isNaN(channel)) kanal = client.guilds.find(g => g.id == message.guildID).channels.find(c => c.name.toLowerCase().includes(channel.toLowerCase()))
  if (!kanal) return message.channel.createMessage(`Can't find a channel with this ID/name.`)
  if (kanal.type == 2) return message.channel.createMessage(`You can't set voice channels as review channel.`)
  if (db.has(`reviewchannel_${message.guildID}`) && db.fetch(`reviewchannel_${message.guildID}`) == kanal.id) return message.channel.createMessage(`Review channel of this guild is already this channel.`)
  if (db.fetch(`suggestionchannel_${message.guildID}`) == kanal.id) return message.channel.createMessage(`Review channel can't be same with suggestion channel.`)
  db.set(`reviewchannel_${message.guildID}`, kanal.id)
  message.channel.createMessage(`Successfully setted the review channel to ${kanal.mention} in this server! Hereafter all suggestions will send to this channel, and when a staff approve this suggestion, it will show up in suggestion channel.`)
}

if (dil == "turkish") {

  if (!message.member.permissions.has('administrator')) return message.channel.createMessage(`Bu komudu kullanmak i??in Y??netici yetkisine sahip olmal??s??n.`)
  if (!db.has(`suggestionchannel_${message.guildID}`)) return message.channel.createMessage(`??ncelikle, \`${prefix}kanalse??\` komuduyla bir ??neri kanal?? se??melisin.`)
  
    const channel = message.channelMentions[0] || args.join(' ')
    if (!channel) return message.channel.createMessage(`Bir kanal ismi yazmal??s??n, kanal ismi etiketlemelisin, kanal IDsi yazmal??s??n veya sil yazarak do??rulama kanal??n?? silmelisin.`)
    if (channel == "sil") {
      if (!db.has(`reviewchannel_${message.guildID}`)) return message.channel.createMessage(`Bu sunucunun zaten bir do??rulama kanal?? yok.`)
      db.delete(`reviewchannel_${message.guildID}`)
      return message.channel.createMessage(`Do??rulama kanal?? ba??ar??yla silindi.`)
    }
    let kanal;
    if (!isNaN(channel)) kanal = client.guilds.find(g => g.id == message.guildID).channels.find(c => c.id == channel)
    if (isNaN(channel)) kanal = client.guilds.find(g => g.id == message.guildID).channels.find(c => c.name.toLowerCase().includes(channel.toLowerCase()))
    if (!kanal) return message.channel.createMessage(`Bu ID/isim ile herhangi bir kanal bulunamad??.`)
    if (kanal.type == 2) return message.channel.createMessage(`Ses kanallar??n?? do??rulama kanal?? olarak se??emezsin.`)
    if (db.has(`reviewchannel_${message.guildID}`) && db.fetch(`reviewchannel_${message.guildID}`) == kanal.id) return message.channel.createMessage(`Bu sunucunun do??rulama kanal?? zaten bu kanal.`)
  if (db.fetch(`suggestionchannel_${message.guildID}`) == kanal.id) return message.channel.createMessage(`Do??rulama kanal?? ??neri kanal?? ile ayn?? olamaz.`)
  db.set(`reviewchannel_${message.guildID}`, kanal.id)
    message.channel.createMessage(`Bu sunucuda do??rulama kanal?? ba??ar??yla ${kanal.mention} olarak se??ildi! Bundan sonra t??m yeni ??neriler bu kanala g??nderilecek, bu kanalda e??er bir yetkili do??rularsa ??neriler kanal??nda g??z??kecek.`)
  }
}

module.exports.help = {
  name: "reviewchannel",
  nametr: "do??rulamakanal??",
  aliase: ["reviewingchannel", "do??rulamakanal??", "do??rulamakanal"],
  descriptionen: "Sets a channel to send suggestions that awaiting approval. (write delete to close reviewing feature)",
  descriptiontr: "Do??rulama bekleyen ??nerileri g??ndermek i??in bir kanal se??er. (do??rulama ??zelli??ini kapatmak i??in sil yaz??n)",
  usageen: "setchannel [channel name, mention or id]",
  usagetr: "??nerikanal [kanal ismi, etiketi veya idsi]",
  category: 'admin'
}
