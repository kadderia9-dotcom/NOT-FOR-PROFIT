module.exports.config = {
  name: "antibd",
  eventType: ["log:user-nickname"],
  version: "0.0.1", // β
  credits: "𝑨𝒃𝒅𝒆𝒍𝒂𝒛𝒊𝒛 & 𝑲𝒉𝒂𝒍𝒊𝒍",
  description: "🚫 𝑷𝒓𝒆𝒗𝒆𝒏𝒕 𝒄𝒉𝒂𝒏𝒈𝒊𝒏𝒈 𝑵𝒀𝑶'𝒔 𝒏𝒊𝒄𝒌𝒏𝒂𝒎𝒆"
};

module.exports.run = async function({ api, event, Users, Threads }) {
  var { logMessageData, threadID, author } = event;
  var botID = api.getCurrentUserID();
  var { BOTNAME, ADMINBOT } = global.config;

  // Nickname الأصلي
  var { nickname } = await Threads.getData(threadID, botID);
  var nickname = nickname ? nickname : `『 ${global.config.PREFIX} 』 ⪼ 𝑵𝒀𝑶`;

  // لو حاول يبدل لقب البوت
  if (logMessageData.participant_id == botID && author != botID && !ADMINBOT.includes(author) && logMessageData.nickname != nickname) {
    api.changeNickname(nickname, threadID, botID);
    var info = await Users.getData(author);

    return api.sendMessage(
      {
        body: `⚠️ ${info.name} - 𝒀𝒐𝒖 𝒅𝒐 𝒏𝒐𝒕 𝒉𝒂𝒗𝒆 𝒑𝒆𝒓𝒎𝒊𝒔𝒔𝒊𝒐𝒏 𝒕𝒐 𝒄𝒉𝒂𝒏𝒈𝒆 𝑵𝒀𝑶'𝒔 𝒏𝒊𝒄𝒌𝒏𝒂𝒎𝒆!\n👨🏻‍💻 𝑫𝒆𝒗𝒆𝒍𝒐𝒑𝒆𝒓𝒔: 𝑨𝒃𝒅𝒆𝒍𝒂𝒛𝒊𝒛 & 𝑲𝒉𝒂𝒍𝒊𝒍`
      },
      threadID
    );
  }
}