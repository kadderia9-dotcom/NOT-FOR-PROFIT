module.exports.config = {
  name: "log",
  eventType: ["log:unsubscribe", "log:subscribe", "log:thread-name"],
  version: "2.0.0",
  credits: `━━━━━━━━━━━━━━━━━━
   𝑵𝒀𝑶 𝑳𝒐𝒈 𝑺𝒚𝒔𝒕𝒆𝒎
   ✦ 𝑨𝒛𝒊𝒛 𝑲𝒂𝒅𝒅𝒆𝒓𝒊
     ↳ fb.com/profile.php?id=100000389910030
   ✦ 𝑲𝒉𝒂𝒍𝒊𝒍 𝑫𝒂𝒇𝒍𝒂𝒘𝒊
     ↳ fb.com/KhalilDaflawi44
━━━━━━━━━━━━━━━━━━`,
  description: "Log system to track bot activities (join/leave/name change)",
  envConfig: {
    enable: true
  }
};

module.exports.run = async function ({ api, event, Users, Threads }) {
  const logger = require("../../utils/log");
  if (!global.configModule[this.config.name].enable) return;
  let botID = api.getCurrentUserID();
  var allThreadID = global.data.allThreadID;
  for (const singleThread of allThreadID) {
    const thread = global.data.threadData.get(singleThread) || {};
    if (typeof thread["log"] != "undefined" && thread["log"] == false) return;
  }

  const moment = require("moment-timezone");
  const time = moment.tz("Africa/Algiers").format("DD/MM/YYYY || HH:mm:ss");
  let nameThread = global.data.threadInfo.get(event.threadID).threadName || "No name";

  let threadInfo = await api.getThreadInfo(event.threadID);
  nameThread = threadInfo.threadName;
  const nameUser = global.data.userName.get(event.author) || await Users.getNameUser(event.author);

  var formReport = `━━━━━━━━━━━━━━━━━━
   ⚠️ 𝑵𝒀𝑶 𝑳𝒐𝒈 𝑬𝒗𝒆𝒏𝒕 ⚠️
━━━━━━━━━━━━━━━━━━
📌 Group: ${nameThread}
🆔 Thread ID: ${event.threadID}
⚡ Action: {task}
👤 User: ${nameUser}
🆔 UserID: ${event.author}
🕒 Time: ${time}
━━━━━━━━━━━━━━━━━━
   𝑩𝒚 𝑨𝒛𝒊𝒛 ✦ 𝑲𝒉𝒂𝒍𝒊𝒍 ✦ 𝑵𝒀𝑶
━━━━━━━━━━━━━━━━━━`;

  let task = "";
  switch (event.logMessageType) {
    case "log:thread-name": {
      newName = event.logMessageData.name || "No name";
      await Threads.setData(event.threadID, { name: newName });
      task = `Group name changed to: ${newName}`;
      break;
    }
    case "log:subscribe": {
      if (event.logMessageData.addedParticipants.some(i => i.userFbId == botID)) 
        task = "Bot was added to a new group";
      break;
    }
    case "log:unsubscribe": {
      if (event.logMessageData.leftParticipantFbId == botID) {
        if (event.senderID == botID) return;
        const data = (await Threads.getData(event.threadID)).data || {};
        data.banned = true;
        var reason = "Bot removed without permission";
        data.reason = reason || null;
        data.dateAdded = time;
        await Threads.setData(event.threadID, { data });
        global.data.threadBanned.set(event.threadID, { reason: data.reason, dateAdded: data.dateAdded });

        task = "Bot was kicked out of the group";
      }
      break;
    }
    default:
      break;
  }

  if (task.length == 0) return;

  formReport = formReport.replace(/\{task}/g, task);

  return api.sendMessage(formReport, global.config.ADMINBOT[0], (error, info) => {
    if (error) return logger(formReport, "Logging Event");
  });
};