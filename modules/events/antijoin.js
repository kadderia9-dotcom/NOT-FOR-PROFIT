module.exports.config = {
  name: "antijoin",
  eventType: ["log:subscribe"],
  version: "1.0.3",
  credits: "𝑨𝒃𝒅𝒆𝒍𝒂𝒛𝒊𝒛 & 𝑲𝒉𝒂𝒍𝒊𝒍",
  description: "🚫 𝑨𝒖𝒕𝒐 𝒓𝒆𝒎𝒐𝒗𝒆 𝒏𝒆𝒘 𝒎𝒆𝒎𝒃𝒆𝒓𝒔 𝒊𝒇 𝒂𝒏𝒕𝒊𝒋𝒐𝒊𝒏 𝒊𝒔 𝒆𝒏𝒂𝒃𝒍𝒆𝒅"
};

module.exports.run = async function({ api, event, Users }) {
  const { threadID } = event;
  const memJoin = event.logMessageData.addedParticipants.map(info => info.userFbId);

  for (let idUser of memJoin) {
    const { readFileSync } = global.nodemodule["fs-extra"];
    const { resolve } = global.nodemodule["path"];
    const path = resolve(__dirname, '../commands', 'cache', 'antijoin.json');
    const { antijoin } = require(path);
    const dataJson = JSON.parse(readFileSync(path, "utf-8"));

    if (antijoin.hasOwnProperty(threadID) && antijoin[threadID] === true) {
      try {
        // حذف العضو بعد ثانية
        setTimeout(async () => {
          await api.removeUserFromGroup(idUser, event.threadID);
        }, 1000);

        return api.sendMessage(
          `✅ 𝑵𝒀𝑶 𝑩𝒐𝒕\n🚫 𝑨 𝒏𝒆𝒘 𝒎𝒆𝒎𝒃𝒆𝒓 𝒘𝒂𝒔 𝒓𝒆𝒎𝒐𝒗𝒆𝒅 𝒃𝒚 𝒂𝒏𝒕𝒊𝒋𝒐𝒊𝒏.\n👨🏻‍💻 𝑫𝒆𝒗𝒆𝒍𝒐𝒑𝒆𝒓𝒔: 𝑨𝒃𝒅𝒆𝒍𝒂𝒛𝒊𝒛 & 𝑲𝒉𝒂𝒍𝒊𝒍`,
          threadID
        );
      } catch (e) {
        return api.sendMessage(
          `❌ 𝑵𝒀𝑶 𝑩𝒐𝒕\n⚠️ 𝑭𝒂𝒊𝒍𝒆𝒅 𝒕𝒐 𝒓𝒆𝒎𝒐𝒗𝒆 𝒖𝒔𝒆𝒓.\n👨🏻‍💻 𝑫𝒆𝒗𝒆𝒍𝒐𝒑𝒆𝒓𝒔: 𝑨𝒃𝒅𝒆𝒍𝒂𝒛𝒊𝒛 & 𝑲𝒉𝒂𝒍𝒊𝒍`,
          threadID
        );
      }
    }
  }
};