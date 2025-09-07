module.exports.config = {
  name: "joinNoti",
  eventType: ["log:subscribe"],
  version: "2.0.0",
  credits: "『𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫𝐬』 𝐀𝐛𝐝𝐞𝐥𝐚𝐳𝐢𝐳 ✦ 𝐊𝐡𝐚𝐥𝐢𝐥",
  description: "Stylish welcome message when bot or users join group",
  dependencies: {
    "fs-extra": ""
  }
};

module.exports.run = async function({ api, event, Users }) {
  const { threadID } = event;
  const BOTNAME = "𝑁𝑌𝑂 𝐵𝑂𝑇";

  // When bot joins group
  if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
    api.changeNickname(`[ ${global.config.PREFIX} ] • ${BOTNAME}`, threadID, api.getCurrentUserID());
    
    return api.sendMessage(
`✿━━━━━━━━━━━━━━✿
✨ 𝑩𝑶𝑻 𝑪𝑶𝑵𝑵𝑬𝑪𝑻𝑬𝑫 ✨

${BOTNAME} is now active in this group 💀
Use commands with prefix: 『 ${global.config.PREFIX} 』

✿━━━━━━━━━━━━━━✿
『𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫𝐬』
➤ ⚡ 𝐀𝐛𝐝𝐞𝐥𝐚𝐳𝐢𝐳
» https://www.facebook.com/aziz.jr.945350

➤ ⚡ 𝐊𝐡𝐚𝐥𝐢𝐥
» https://www.facebook.com/KhalilDaflawi44
✿━━━━━━━━━━━━━━✿`, threadID);
  } 
  // When new members join
  else {
    try {
      const { createReadStream, existsSync } = global.nodemodule["fs-extra"];
      const { threadName, participantIDs } = await api.getThreadInfo(threadID);

      const nameArray = [];
      const mentions = [];
      const memLength = [];
      let i = 0;

      for (const id in event.logMessageData.addedParticipants) {
        const userName = event.logMessageData.addedParticipants[id].fullName;
        nameArray.push(userName);
        mentions.push({ tag: userName, id });
        memLength.push(participantIDs.length - i++);

        if (!global.data.allUserID.includes(id)) {
          await Users.createData(id, { name: userName, data: {} });
          global.data.userName.set(id, userName);
          global.data.allUserID.push(id);
        }
      }
      memLength.sort((a, b) => a - b);

      const threadData = global.data.threadData.get(parseInt(threadID)) || {};
      let msg = "";

      if (typeof threadData.customJoin === "undefined") {
        msg = `✿━━━━━━━━━━━━━━✿
👤 𝑾𝒆𝒍𝒄𝒐𝒎𝒆: {name}  
🎉 You are member number: {soThanhVien}  
💬 Group: {threadName}  
➤ Added by: {author}  
📅 Date: {bok}  
⌚ Time: {get}  

Enjoy your time with us 💝
✿━━━━━━━━━━━━━━✿
『𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫𝐬』
➤ ⚡ 𝐀𝐛𝐝𝐞𝐥𝐚𝐳𝐢𝐳
» https://www.facebook.com/aziz.jr.945350

➤ ⚡ 𝐊𝐡𝐚𝐥𝐢𝐥
» https://www.facebook.com/KhalilDaflawi44
✿━━━━━━━━━━━━━━✿`;
      } else {
        msg = threadData.customJoin;
      }

      const getData = await Users.getData(event.author);
      const nameAuthor = typeof getData.name === "undefined" ? "Link Join" : getData.name;

      const moment = require("moment-timezone");
      const time = moment.tz("Asia/Ho_Chi_Minh");
      const gio = time.format("HH");
      const bok = time.format("DD/MM/YYYY");

      let get = "";
      if (gio >= 5 && gio < 11) get = "Morning";
      else if (gio >= 11 && gio < 14) get = "Noon";
      else if (gio >= 14 && gio < 19) get = "Afternoon";
      else get = "Evening";

      msg = msg
        .replace(/\{name}/g, nameArray.join(", "))
        .replace(/\{soThanhVien}/g, memLength.join(", "))
        .replace(/\{threadName}/g, threadName)
        .replace(/\{author}/g, nameAuthor)
        .replace(/\{bok}/g, bok)
        .replace(/\{get}/g, get);

      return api.sendMessage({ body: msg, mentions }, threadID);
    } catch (e) {
      console.log(e);
    }
  }
};