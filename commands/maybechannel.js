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
  if (!channel) return message.channel.createMessage(`You must write a channel name, mention a channel, write a channel ID or write delete to delete potentional channel.`)
  if (channel == "delete") {
    if (!db.has(`maybechannel_${message.guildID}`)) return message.channel.createMessage(`This guild already doesn't have a potentional channel.`)
    db.delete(`maybechannel_${message.guildID}`)
    return message.channel.createMessage(`Successfully deleted the potentional channel.`)
  }
  let kanal;
  if (!isNaN(channel)) kanal = client.guilds.find(g => g.id == message.guildID).channels.find(c => c.id == channel)
  if (isNaN(channel)) kanal = client.guilds.find(g => g.id == message.guildID).channels.find(c => c.name.toLowerCase().includes(channel.toLowerCase()))
  if (!kanal) return message.channel.createMessage(`Can't find a channel with this ID/name.`)
  if (kanal.type == 2) return message.channel.createMessage(`You can't set voice channels as potentional channel.`)
  if (db.has(`maybechannel_${message.guildID}`) && db.fetch(`maybechannel_${message.guildID}`) == kanal.id) return message.channel.createMessage(`Potentional channel of this guild is already this channel.`)
  if (db.fetch(`suggestionchannel_${message.guildID}`) == kanal.id) return message.channel.createMessage(`Potentional channel can't be same with suggestion channel.`)
  db.set(`maybechannel_${message.guildID}`, kanal.id)
  message.channel.createMessage(`Successfully setted the potentional channel to ${kanal.mention} in this server! Hereafter all potentional suggestions will send to this channel.`)
}

if (dil == "turkish") {

  if (!message.member.permissions.has('administrator')) return message.channel.createMessage(`Bu komudu kullanmak i??in Y??netici yetkisine sahip olman gerek.`)
  
    const channel = message.channelMentions[0] || args.join(' ')
    if (!channel) return message.channel.createMessage(`Bir kanal ismi yazmal??s??n, kanal etiketlemelisin, kanal IDsi yazmal??s??n or veya d??????n??lecek ??neri kanal?? silmek i??in sil yazmal??s??n.`)
    if (channel == "sil") {
      if (!db.has(`maybechannel_${message.guildID}`)) return message.channel.createMessage(`Bu sunucunun zaten bir d??????n??lecek ??neri kanal?? yok.`)
      db.delete(`maybechannel_${message.guildID}`)
      return message.channel.createMessage(`Ba??ar??yla d??????n??lecek ??neri kanal?? silindi.`)
    }
    let kanal;
    if (!isNaN(channel)) kanal = client.guilds.find(g => g.id == message.guildID).channels.find(c => c.id == channel)
    if (isNaN(channel)) kanal = client.guilds.find(g => g.id == message.guildID).channels.find(c => c.name.toLowerCase().includes(channel.toLowerCase()))
    if (!kanal) return message.channel.createMessage(`Bu ID/isim ile bir kanal bulunamad??.`)
    if (kanal.type == 2) return message.channel.createMessage(`Ses kanallar??n?? d??????n??lecek ??neri kanal?? yapamazs??n.`)
    if (db.has(`maybechannel_${message.guildID}`) && db.fetch(`maybechannel_${message.guildID}`) == kanal.id) return message.channel.createMessage(`Bu sunucunun d??????n??lecek ??neri kanal?? zaten bu kanal.`)
  if (db.fetch(`suggestionchannel_${message.guildID}`) == kanal.id) return message.channel.createMessage(`D??????n??lecek ??neri kanal??, ??neri kanal?? ile ayn?? olamaz.`)
  db.set(`maybechannel_${message.guildID}`, kanal.id)
    message.channel.createMessage(`Ba??ar??yla bu sunucunun d??????n??lecek ??neri kanal?? ${kanal.mention} olarak belirlendi! Bundan sonra t??m d??????n??lecek ??neriler bu kanala g??nderilecektir.`)
  }
}

module.exports.help = {
  name: "maybechannel",
  nametr: "d??????n??lecek??nerikanal??",
  aliase: ["potentionalchannel", "d??????n??lecekkanal", "d??????n??lecek??nerikanal??", "d??????n??lecek??nerikanal"],
  descriptionen: "Sets a channel to send potential suggestions. (write delete to delete potential channel)",
  descriptiontr: "D??????n??lecek ??nerileri g??ndermek i??in bir kanal se??er. (d??????n??lecek ??neri kanal??n?? silmek i??in sil yaz)",
  usageen: "setchannel [channel name, mention or id]",
  usagetr: "??nerikanal [kanal ismi, etiketi veya idsi]",
  category: 'admin'
}
