module.exports.config = {
  name: "help",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Modified by 𝑨𝒃𝒅𝒆𝒍𝒂𝒛𝒊𝒛 & 𝑲𝒉𝒂𝒍𝒊𝒍",
  description: "Show all bot commands",
  commandCategory: "system",
  usages: "[help]",
  cooldowns: 3
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID } = event;
  const { commands } = global.client;
  const prefix = global.config.PREFIX;

  // جلب جميع الأوامر من مجلد commands
  const arrayInfo = [];
  for (var [name] of commands) arrayInfo.push(name);

  arrayInfo.sort();

  let msg = "✦━━━━━━━━━━━━✦\n";
  msg += "      🛠 𝑩𝑶𝑻 𝑪𝑶𝑴𝑴𝑨𝑵𝑫𝑺 🛠\n";
  msg += "✦━━━━━━━━━━━━✦\n\n";

  let i = 0;
  for (let item of arrayInfo) {
    msg += ` ${++i}. ${prefix}${item}\n`;
  }

  msg += "\n✦━━━━━━━━━━━━✦\n";
  msg += "👑 𝑴𝒂𝒅𝒆 𝒃𝒚:\n";
  msg += "➤ 𝑨𝒃𝒅𝒆𝒍𝒂𝒛𝒊𝒛\n";
  msg += "➤ 𝑲𝒉𝒂𝒍𝒊𝒍\n";
  msg += "✦━━━━━━━━━━━━✦";

  return api.sendMessage(msg, threadID);
};