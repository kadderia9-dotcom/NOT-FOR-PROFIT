module.exports.config = {
  name: "antiout",
  eventType: ["log:unsubscribe"],
  version: "1.0.0",
  credits: "𝑨𝒃𝒅𝒆𝒍𝒂𝒛𝒊𝒛 & 𝑲𝒉𝒂𝒍𝒊𝒍",
  description: "🚫 𝑷𝒓𝒆𝒗𝒆𝒏𝒕 𝒖𝒔𝒆𝒓𝒔 𝒇𝒓𝒐𝒎 𝒍𝒆𝒂𝒗𝒊𝒏𝒈 𝒕𝒉𝒆 𝒈𝒓𝒐𝒖𝒑"
};

module.exports.run = async ({ event, api, Threads, Users }) => {
  let data = (await Threads.getData(event.threadID)).data || {};
  if (!data.antiout) return;

  if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;

  const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) 
    || await Users.getNameUser(event.logMessageData.leftParticipantFbId);

  const type = (event.author == event.logMessageData.leftParticipantFbId) 
    ? "self" 
    : "kicked";

  if (type === "self") {
    api.addUserToGroup(event.logMessageData.leftParticipantFbId, event.threadID, (error, info) => {
      if (error) {
        api.sendMessage(
          `⚠️ 𝑵𝒀𝑶 𝑩𝒐𝒕\n❌ 𝑪𝒐𝒖𝒍𝒅 𝒏𝒐𝒕 𝒂𝒅𝒅 ${name} 𝒃𝒂𝒄𝒌 𝒕𝒐 𝒕𝒉𝒆 𝒈𝒓𝒐𝒖𝒑.\n👨🏻‍💻 𝑫𝒆𝒗𝒆𝒍𝒐𝒑𝒆𝒓𝒔: 𝑨𝒃𝒅𝒆𝒍𝒂𝒛𝒊𝒛 & 𝑲𝒉𝒂𝒍𝒊𝒍`,
          event.threadID
        );
      } else {
        api.sendMessage(
          `✅ 𝑵𝒀𝑶 𝑩𝒐𝒕\n🔄 ${name} 𝒘𝒂𝒔 𝒂𝒅𝒅𝒆𝒅 𝒃𝒂𝒄𝒌 𝒕𝒐 𝒕𝒉𝒆 𝒈𝒓𝒐𝒖𝒑.\n👨🏻‍💻 𝑫𝒆𝒗𝒆𝒍𝒐𝒑𝒆𝒓𝒔: 𝑨𝒃𝒅𝒆𝒍𝒂𝒛𝒊𝒛 & 𝑲𝒉𝒂𝒍𝒊𝒍`,
          event.threadID
        );
      }
    });
  }
};