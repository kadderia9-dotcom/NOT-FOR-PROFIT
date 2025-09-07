module.exports.config = {
  name: "guard",
  eventType: ["log:thread-admins"],
  version: "1.1.0",
  credits: "𝑨𝒃𝒅𝒆𝒍𝒂𝒛𝒊𝒛 & 𝑲𝒉𝒂𝒍𝒊𝒍",
  description: "🛡️ 𝑷𝒓𝒐𝒕𝒆𝒄𝒕 𝑨𝒅𝒎𝒊𝒏 𝑹𝒐𝒍𝒆𝒔"
};

module.exports.run = async function ({ event, api, Threads }) {
  const { logMessageType, logMessageData, author } = event;
  let data = (await Threads.getData(event.threadID)).data;

  if (data.guard !== true) return;

  switch (logMessageType) {
    case "log:thread-admins": {
      if (logMessageData.ADMIN_EVENT == "add_admin") {
        if (author == api.getCurrentUserID()) return;
        if (logMessageData.TARGET_ID == api.getCurrentUserID()) return;

        api.changeAdminStatus(event.threadID, author, false, callback);
        api.changeAdminStatus(event.threadID, logMessageData.TARGET_ID, false);

        function callback(err) {
          if (err) return api.sendMessage("⚠️ 𝑵𝒀𝑶 𝑩𝒐𝒕: 𝑬𝒓𝒓𝒐𝒓!", event.threadID, event.messageID);
          return api.sendMessage("🛡️ 𝑮𝒖𝒂𝒓𝒅 𝑴𝒐𝒅𝒆 𝑨𝒄𝒕𝒊𝒗𝒆: 𝑷𝒓𝒆𝒗𝒆𝒏𝒕 𝑨𝒅𝒎𝒊𝒏 𝑯𝒊𝒋𝒂𝒄𝒌!", event.threadID, event.messageID);
        }
      }

      else if (logMessageData.ADMIN_EVENT == "remove_admin") {
        if (author == api.getCurrentUserID()) return;
        if (logMessageData.TARGET_ID == api.getCurrentUserID()) return;

        api.changeAdminStatus(event.threadID, author, false, callback);
        api.changeAdminStatus(event.threadID, logMessageData.TARGET_ID, true);

        function callback(err) {
          if (err) return api.sendMessage("⚠️ 𝑵𝒀𝑶 𝑩𝒐𝒕: 𝑬𝒓𝒓𝒐𝒓!", event.threadID, event.messageID);
          return api.sendMessage("🛡️ 𝑮𝒖𝒂𝒓𝒅 𝑴𝒐𝒅𝒆 𝑨𝒄𝒕𝒊𝒗𝒆: 𝑨𝒅𝒎𝒊𝒏 𝑷𝒓𝒐𝒕𝒆𝒄𝒕𝒆𝒅!", event.threadID, event.messageID);
        }
      }
    }
  }
};