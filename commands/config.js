const Eris = require("eris");
const db = require('quick.db');

module.exports.run = async (client, message, args) => {

  function colorToSigned24Bit(s) {
    return (parseInt(s.substr(1), 16) << 8) / 256;
}

let dil = db.fetch(`dil_${message.guildID}`) || "english";

if (dil == "english") {

    if (!message.member.permissions.has('administrator')) return message.channel.createMessage(`You must have Administrator permission to use this command.`)

    let prefix = db.fetch(`prefix_${message.guildID}`) || "."
    var staffroles;
    if (!db.has(`staffrole_${message.guildID}`) || db.fetch(`staffrole_${message.guildID}`).length == 0) staffroles = `None (\`${prefix}staffrole\`)`
    if (db.has(`staffrole_${message.guildID}`) && db.fetch(`staffrole_${message.guildID}`).length != 0) staffroles = db.fetch(`staffrole_${message.guildID}`).map(r => `<:rightarrow:709539888411836526> <@&` + r + `>\n`).join('')
    var suggestionchannel; 
    if (db.has(`suggestionchannel_${message.guildID}`) && message.channel.guild.channels.has(db.fetch(`suggestionchannel_${message.guildID}`))) suggestionchannel = `<#${db.fetch(`suggestionchannel_${message.guildID}`)}>`
    if (!db.has(`suggestionchannel_${message.guildID}`) || !message.channel.guild.channels.has(db.fetch(`suggestionchannel_${message.guildID}`))) suggestionchannel = `None (\`${prefix}setchannel\`)`
    var reviewchannel; 
    if (db.has(`reviewchannel_${message.guildID}`) && message.channel.guild.channels.has(db.fetch(`reviewchannel_${message.guildID}`))) reviewchannel = `<#${db.fetch(`reviewchannel_${message.guildID}`)}>`
    if (!db.has(`reviewchannel_${message.guildID}`) || !message.channel.guild.channels.has(db.fetch(`reviewchannel_${message.guildID}`))) reviewchannel = `None (\`${prefix}reviewchannel\`)`
    var approvedchannel; 
    if (db.has(`approvedchannel_${message.guildID}`) && message.channel.guild.channels.has(db.fetch(`approvedchannel_${message.guildID}`))) approvedchannel = `<#${db.fetch(`approvedchannel_${message.guildID}`)}>`
    if (!db.has(`approvedchannel_${message.guildID}`) || !message.channel.guild.channels.has(db.fetch(`approvedchannel_${message.guildID}`))) approvedchannel = `None (\`${prefix}approvedchannel\`)`
    var deniedchannel; 
    if (db.has(`deniedchannel_${message.guildID}`) && message.channel.guild.channels.has(db.fetch(`deniedchannel_${message.guildID}`))) deniedchannel = `<#${db.fetch(`deniedchannel_${message.guildID}`)}>`
    if (!db.has(`deniedchannel_${message.guildID}`) || !message.channel.guild.channels.has(db.fetch(`deniedchannel_${message.guildID}`))) deniedchannel = `None (\`${prefix}deniedchannel\`)`
    var invalidchannel; 
    if (db.has(`invalidchannel_${message.guildID}`) && message.channel.guild.channels.has(db.fetch(`invalidchannel_${message.guildID}`))) invalidchannel = `<#${db.fetch(`invalidchannel_${message.guildID}`)}>`
    if (!db.has(`invalidchannel_${message.guildID}`) || !message.channel.guild.channels.has(db.fetch(`invalidchannel_${message.guildID}`))) invalidchannel = `None (\`${prefix}invalidchannel\`)`
    var potentialchannel; 
    if (db.has(`maybechannel_${message.guildID}`) && message.channel.guild.channels.has(db.fetch(`maybechannel_${message.guildID}`))) potentialchannel = `<#${db.fetch(`maybechannel_${message.guildID}`)}>`
    if (!db.has(`maybechannel_${message.guildID}`) || !message.channel.guild.channels.has(db.fetch(`maybechannel_${message.guildID}`))) potentialchannel = `None (\`${prefix}maybechannel\`)`
    var allowvoting;
    if (db.has(`denyvoting_${message.guildID}`)) allowvoting = "False"
    if (!db.has(`denyvoting_${message.guildID}`)) allowvoting = "True"
    var customapprove;
    if (db.has(`customapprove_${message.guildID}`) && /\p{Emoji}/u.test(db.fetch(`customapprove_${message.guildID}`)) == true) customapprove = db.fetch(`customapprove_${message.guildID}`)
    if (db.has(`customapprove_${message.guildID}`) && /\p{Emoji}/u.test(db.fetch(`customapprove_${message.guildID}`)) == false) customapprove = '<:' + db.fetch(`customapprove_${message.guildID}`).split(':')[0] + ':' + db.fetch(`customapprove_${message.guildID}`).split(':')[1] + '>'
    if (!db.has(`customapprove_${message.guildID}`)) customapprove = "👍 (default)"
    var customdeny;
    if (db.has(`customdeny_${message.guildID}`) && /\p{Emoji}/u.test(db.fetch(`customdeny_${message.guildID}`)) == true) customdeny = db.fetch(`customdeny_${message.guildID}`)
    if (db.has(`customdeny_${message.guildID}`) && /\p{Emoji}/u.test(db.fetch(`customdeny_${message.guildID}`)) == false) customdeny = '<:' + db.fetch(`customdeny_${message.guildID}`).split(':')[0] + ':' + db.fetch(`customdeny_${message.guildID}`).split(':')[1] + '>'
    if (!db.has(`customdeny_${message.guildID}`)) customdeny = "👎 (default)"
    var autodeny;
    if (db.has(`autodeny_${message.guildID}`)) autodeny = db.fetch(`autodeny_${message.guildID}`)
    if (!db.has(`autodeny_${message.guildID}`)) autodeny = `None (\`${prefix}autodeny\`)`
    var autoapprove;
    if (db.has(`autoapprove_${message.guildID}`)) autoapprove = db.fetch(`autoapprove_${message.guildID}`)
    if (!db.has(`autoapprove_${message.guildID}`)) autoapprove = `None (\`${prefix}autoapprove\`)`
    message.channel.createMessage({embed: {title: `__**Config**__`, description: `**Suggestions channel:** ${suggestionchannel}\n**Suggestion review channel:** ${reviewchannel}\n \n**Approved suggestions channel:** ${approvedchannel}\n**Denied suggestions channel:** ${deniedchannel}\n**Invalid suggestions channel:** ${invalidchannel}\n**Potential suggestions channel:** ${potentialchannel}\n \n**Allowing vote on suggestions:** ${allowvoting}\n \n**Approve emoji:** ${customapprove}\n**Deny emoji:** ${customdeny}\n \n**Auto approve count:** ${autoapprove}\n**Auto deny count:** ${autodeny}\n \n**__Staff roles__**\n${staffroles}\n \n**Prefix:** ${prefix}`, color: colorToSigned24Bit("#2F3136")}})
}

if (dil == "turkish") {

    if (!message.member.permissions.has('administrator')) return message.channel.createMessage(`Bu komudu kullanmak için Yönetici yetkisine sahip olmalısın.`)

    let prefix = db.fetch(`prefix_${message.guildID}`) || "."
    var staffroles;
    if (!db.has(`staffrole_${message.guildID}`) || db.fetch(`staffrole_${message.guildID}`).length == 0) staffroles = `Belirlenmemiş (\`${prefix}yetkilirol\`)`
    if (db.has(`staffrole_${message.guildID}`) && db.fetch(`staffrole_${message.guildID}`).length != 0) staffroles = db.fetch(`staffrole_${message.guildID}`).map(r => `<:rightarrow:709539888411836526> <@&` + r + `>\n`).join('')
    var suggestionchannel; 
    if (db.has(`suggestionchannel_${message.guildID}`) && message.channel.guild.channels.has(db.fetch(`suggestionchannel_${message.guildID}`))) suggestionchannel = `<#${db.fetch(`suggestionchannel_${message.guildID}`)}>`
    if (!db.has(`suggestionchannel_${message.guildID}`) || !message.channel.guild.channels.has(db.fetch(`suggestionchannel_${message.guildID}`))) suggestionchannel = `Belirlenmemiş (\`${prefix}kanalseç\`)`
    var reviewchannel; 
    if (db.has(`reviewchannel_${message.guildID}`) && message.channel.guild.channels.has(db.fetch(`reviewchannel_${message.guildID}`))) reviewchannel = `<#${db.fetch(`reviewchannel_${message.guildID}`)}>`
    if (!db.has(`reviewchannel_${message.guildID}`) || !message.channel.guild.channels.has(db.fetch(`reviewchannel_${message.guildID}`))) reviewchannel = `Belirlenmemiş (\`${prefix}doğrulamakanalı\`)`
    var approvedchannel; 
    if (db.has(`approvedchannel_${message.guildID}`) && message.channel.guild.channels.has(db.fetch(`approvedchannel_${message.guildID}`))) approvedchannel = `<#${db.fetch(`approvedchannel_${message.guildID}`)}>`
    if (!db.has(`approvedchannel_${message.guildID}`) || !message.channel.guild.channels.has(db.fetch(`approvedchannel_${message.guildID}`))) approvedchannel = `Belirlenmemiş (\`${prefix}onaylanmışönerikanal\`)`
    var deniedchannel; 
    if (db.has(`deniedchannel_${message.guildID}`) && message.channel.guild.channels.has(db.fetch(`deniedchannel_${message.guildID}`))) deniedchannel = `<#${db.fetch(`deniedchannel_${message.guildID}`)}>`
    if (!db.has(`deniedchannel_${message.guildID}`) || !message.channel.guild.channels.has(db.fetch(`deniedchannel_${message.guildID}`))) deniedchannel = `Belirlenmemiş (\`${prefix}reddedilenönerikanal\`)`
    var invalidchannel; 
    if (db.has(`invalidchannel_${message.guildID}`) && message.channel.guild.channels.has(db.fetch(`invalidchannel_${message.guildID}`))) invalidchannel = `<#${db.fetch(`invalidchannel_${message.guildID}`)}>`
    if (!db.has(`invalidchannel_${message.guildID}`) || !message.channel.guild.channels.has(db.fetch(`invalidchannel_${message.guildID}`))) invalidchannel = `Belirlenmemiş (\`${prefix}geçersizönerikanal\`)`
    var potentialchannel; 
    if (db.has(`maybechannel_${message.guildID}`) && message.channel.guild.channels.has(db.fetch(`maybechannel_${message.guildID}`))) potentialchannel = `<#${db.fetch(`maybechannel_${message.guildID}`)}>`
    if (!db.has(`maybechannel_${message.guildID}`) || !message.channel.guild.channels.has(db.fetch(`maybechannel_${message.guildID}`))) potentialchannel = `Belirlenmemiş (\`${prefix}düşünülecekönerikanal\`)`
    var allowvoting;
    if (db.has(`denyvoting_${message.guildID}`)) allowvoting = "Kapalı"
    if (!db.has(`denyvoting_${message.guildID}`)) allowvoting = "Açık"
    var customapprove;
    if (db.has(`customapprove_${message.guildID}`) && /\p{Emoji}/u.test(db.fetch(`customapprove_${message.guildID}`)) == true) customapprove = db.fetch(`customapprove_${message.guildID}`)
    if (db.has(`customapprove_${message.guildID}`) && /\p{Emoji}/u.test(db.fetch(`customapprove_${message.guildID}`)) == false) customapprove = '<:' + db.fetch(`customapprove_${message.guildID}`).split(':')[0] + ':' + db.fetch(`customapprove_${message.guildID}`).split(':')[1] + '>'
    if (!db.has(`customapprove_${message.guildID}`)) customapprove = "👍 (default)"
    var customdeny;
    if (db.has(`customdeny_${message.guildID}`) && /\p{Emoji}/u.test(db.fetch(`customdeny_${message.guildID}`)) == true) customdeny = db.fetch(`customdeny_${message.guildID}`)
    if (db.has(`customdeny_${message.guildID}`) && /\p{Emoji}/u.test(db.fetch(`customdeny_${message.guildID}`)) == false) customdeny = '<:' + db.fetch(`customdeny_${message.guildID}`).split(':')[0] + ':' + db.fetch(`customdeny_${message.guildID}`).split(':')[1] + '>'
    if (!db.has(`customdeny_${message.guildID}`)) customdeny = "👎 (default)"
    var autodeny;
    if (db.has(`autodeny_${message.guildID}`)) autodeny = db.fetch(`autodeny_${message.guildID}`)
    if (!db.has(`autodeny_${message.guildID}`)) autodeny = `Belirlenmemiş (\`${prefix}otomatikred\`)`
    var autoapprove;
    if (db.has(`autoapprove_${message.guildID}`)) autoapprove = db.fetch(`autoapprove_${message.guildID}`)
    if (!db.has(`autoapprove_${message.guildID}`)) autoapprove = `Belirlenmemiş (\`${prefix}otomatikonay\`)`
    message.channel.createMessage({embed: {title: `__**Ayarlamalar**__`, description: `**Öneri kanalı:** ${suggestionchannel}\n**Öneri doğrulama kanalı:** ${reviewchannel}\n \n**Onaylanmış öneri kanalı:** ${approvedchannel}\n**Reddedilmiş öneri kanalı:** ${deniedchannel}\n**Geçersiz öneri kanalı:** ${invalidchannel}\n**Düşünülecek öneri kanalı:** ${potentialchannel}\n \n**Önerilerde oylama:** ${allowvoting}\n \n**Onay emojisi:** ${customapprove}\n**Red emojisi:** ${customdeny}\n \n**Otomatik onay sayısı:** ${autoapprove}\n**Otomatik red sayısı:** ${autodeny}\n \n**__Yetkili rolleri__**\n${staffroles}\n \n**Önek:** ${prefix}`, color: colorToSigned24Bit("#2F3136")}})
}
}

module.exports.help = {
  name: "config",
  nametr: "ayarlar",
  aliase: ["ayarlar", "ayarlamalar", "botconfig"],
  descriptionen: "Shows the configs of this server.",
  descriptiontr: "Bu sunucunun ayarlamalarını gösterir.",
  usageen: "staff",
  usagetr: "yetkili",
  category: 'admin'
}
