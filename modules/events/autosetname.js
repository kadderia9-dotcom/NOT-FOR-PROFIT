module.exports.config = {
  name: "autosetname",
  eventType: ["log:subscribe"],
  version: "1.1.0",
  credits: "𝑨𝒃𝒅𝒆𝒍𝒂𝒛𝒊𝒛 & 𝑲𝒉𝒂𝒍𝒊𝒍",
  description: "✨ 𝑨𝒖𝒕𝒐 𝑺𝒆𝒕 𝑵𝒊𝒄𝒌𝒏𝒂𝒎𝒆 𝒇𝒐𝒓 𝑵𝒆𝒘 𝑴𝒆𝒎𝒃𝒆𝒓𝒔"
};

module.exports.run = async function ({ Threads, api, event, Users }) {
  const { createReadStream, readFileSync, readdirSync } = global.nodemodule["fs-extra"];
  const { join } = global.nodemodule["path"];
  const { threadID } = event;

  // الوقت والتاريخ
  const moment = require("moment-timezone");
  var time = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || DD/MM/YYYY");
  var day = moment.tz("Asia/Ho_Chi_Minh").format("dddd");
  const daysMap = {
    Sunday: "Chủ Nhật",
    Monday: "Thứ Hai",
    Tuesday: "Thứ Ba",
    Wednesday: "Thứ Tư",
    Thursday: "Thứ Năm",
    Friday: "Thứ Sáu",
    Saturday: "Thứ Bảy"
  };
  if (daysMap[day]) day = daysMap[day];

  // اعدادات الاسم
  var memJoin = event.logMessageData.addedParticipants.map(info => info.userFbId);
  for (let idUser of memJoin) {
    const pathData = join("./modules/commands", "cache", "data", "autosetname.json");
    var dataJson = JSON.parse(readFileSync(pathData, "utf-8"));
    var thisThread = dataJson.find(item => item.threadID == threadID) || { threadID, nameUser: [] };

    if (thisThread.nameUser.length != 0) {
      var setName = thisThread.nameUser[0];
      await new Promise(resolve => setTimeout(resolve, 1000));
      var nameInfo = await api.getUserInfo(idUser);
      var name = nameInfo[idUser].name;
      api.changeNickname(`${setName} ${name}`, threadID, idUser);
    }
  }

  // مرفقات صوتية أو صور
  const gifPath = join(__dirname, "cache", "autosetname", "randomgif", "autosetname.mp3");
  const randomPath = readdirSync(join(__dirname, "cache", "autosetname", "randomgif"));

  return api.sendMessage({
    body: `✅ 𝑵𝒀𝑶 𝑩𝒐𝒕\n━━━━━━━━━━━━━━━\n✨ 𝑵𝒊𝒄𝒌𝒏𝒂𝒎𝒆 𝒔𝒆𝒕 𝒇𝒐𝒓 𝒏𝒆𝒘 𝒎𝒆𝒎𝒃𝒆𝒓.\n📅 ${day} || ${time}\n👨🏻‍💻 𝑫𝒆𝒗𝒔: 𝑨𝒃𝒅𝒆𝒍𝒂𝒛𝒊𝒛 & 𝑲𝒉𝒂𝒍𝒊𝒍`,
    attachment: createReadStream(gifPath)
  }, threadID, event.messageID);
};