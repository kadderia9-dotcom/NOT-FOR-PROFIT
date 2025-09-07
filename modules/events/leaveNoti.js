module.exports.config = {
  name: "leaveNoti",
  eventType: ["log:unsubscribe"],
  version: "2.0.0",
  credits: `━━━━━━━━━━━━━━━━━━
   𝑳𝒆𝒂𝒗𝒆 𝑵𝒐𝒕𝒊 𝑩𝒚
   ✦ 𝑨𝒛𝒊𝒛 𝑲𝒂𝒅𝒅𝒆𝒓𝒊 
     ↳ fb.com/profile.php?id=100000389910030
   ✦ 𝑵𝒀𝑶 𝑻𝒆𝒂𝒎
     ↳ github.com/NYO-Team
━━━━━━━━━━━━━━━━━━`,
  description: "Send a leave notification when a member exits the group with random gif/photo/video",
  dependencies: {
    "fs-extra": "",
    "path": ""
  }
};

const checkttPath = __dirname + '/../commands/tuongtac/checktt/';

module.exports.onLoad = function () {
  const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
  const { join } = global.nodemodule["path"];

  const path = join(__dirname, "cache", "leaveGif", "randomgif");
  if (existsSync(path)) mkdirSync(path, { recursive: true });

  const path2 = join(__dirname, "cache", "leaveGif", "randomgif");
  if (!existsSync(path2)) mkdirSync(path2, { recursive: true });

  return;
};

module.exports.run = async function ({ api, event, Users, Threads }) {
  if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
  const { createReadStream, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } = global.nodemodule["fs-extra"];
  const { join } = global.nodemodule["path"];
  const { threadID } = event;
  var fullYear = global.client.getTime("fullYear");
  var getHours = await global.client.getTime("hours");
  const moment = require("moment-timezone");
  const time = moment.tz("Africa/Algiers").format("DD/MM/YYYY || HH:mm:s");
  const hours = moment.tz("Africa/Algiers").format("HH");
  const data = global.data.threadData.get(parseInt(threadID)) || (await Threads.getData(threadID)).data;
  const iduser = event.logMessageData.leftParticipantFbId;
  const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
  const type = (event.author == event.logMessageData.leftParticipantFbId) ? "𝑳𝒆𝒇𝒕" : "𝑲𝒊𝒄𝒌𝒆𝒅";
  const path = join(__dirname, "cache", "leaveGif", "randomgif");
  const pathGif = join(path, `${threadID}`);
  var msg, formPush;

  // remove user data from checktt
  if (existsSync(checkttPath + threadID + '.json')) {
    const threadData = JSON.parse(readFileSync(checkttPath + threadID + '.json'));
    const userData_week_index = threadData.week.findIndex(e => e.id == event.logMessageData.leftParticipantFbId);
    const userData_day_index = threadData.day.findIndex(e => e.id == event.logMessageData.leftParticipantFbId);
    const userData_total_index = threadData.total.findIndex(e => e.id == event.logMessageData.leftParticipantFbId);
    if (userData_total_index != -1) threadData.total.splice(userData_total_index, 1);
    if (userData_week_index != -1) threadData.week.splice(userData_week_index, 1);
    if (userData_day_index != -1) threadData.day.splice(userData_day_index, 1);

    writeFileSync(checkttPath + threadID + '.json', JSON.stringify(threadData, null, 4));
  }
  if (existsSync(path)) mkdirSync(path, { recursive: true });

  (typeof data.customLeave == "undefined") 
    ? msg = `━━━━━━━━━━━━━━━━━━
     ⚠️ 𝑴𝒆𝒎𝒃𝒆𝒓 𝑵𝒐𝒕𝒊𝒇𝒊𝒄𝒂𝒕𝒊𝒐𝒏 ⚠️
━━━━━━━━━━━━━━━━━━
👤 𝑼𝒔𝒆𝒓: {name}
📌 𝑺𝒕𝒂𝒕𝒖𝒔: {type}
📅 𝑫𝒂𝒕𝒆: {time}
━━━━━━━━━━━━━━━━━━
   𝑩𝒚 𝑨𝒛𝒊𝒛 𝑲𝒂𝒅𝒅𝒆𝒓𝒊 ✦ 𝑵𝒀𝑶
━━━━━━━━━━━━━━━━━━`
    : msg = data.customLeave;

  msg = msg
    .replace(/\{iduser}/g, iduser)
    .replace(/\{name}/g, name)
    .replace(/\{type}/g, type)
    .replace(/\{session}/g, hours <= 10 ? "Morning" : 
      hours > 10 && hours <= 12 ? "Noon" :
      hours > 12 && hours <= 18 ? "Afternoon" : "Evening")
    .replace(/\{fullYear}/g, fullYear)
    .replace(/\{time}/g, time);

  const randomPath = readdirSync(join(__dirname, "cache", "leaveGif", "randomgif"));

  if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathGif) };
  else if (randomPath.length != 0) {
    const pathRandom = join(__dirname, "cache", "leaveGif", "randomgif",`${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
    formPush = { body: msg, attachment: createReadStream(pathRandom) };
  }
  else formPush = { body: msg };

  return api.sendMessage(formPush, threadID);
};