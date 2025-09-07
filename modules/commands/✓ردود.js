const fs = global.nodemodule["fs-extra"];
module.exports.config = {
  name: "goibot",
  version: "1.0.5",
  hasPermssion: 0,
  credits: "Mod by John Lester, updated by Grok",
  description: "goibot",
  commandCategory: "𝕊𝔸𝕐",
  usages: "noprefix",
  cooldowns: 5,
};

module.exports.handleEvent = async function ({ api, event, args, Threads, Users }) {
  var { threadID, messageID } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Dhaka").format("HH:MM:ss L");
  var idgr = `${event.threadID}`;
  var id = event.senderID;
  var name = await Users.getNameUser(event.senderID);

  var tl = [
    "واش واش 🙂",
    "تجي عندي نشربك القهوة....هممم",
    "تبلع ولا نجبد ليستوار معا ختك خولة...😾",
    "متكونش أناني وريلي المؤخرة تاعك....هممممم🤦🏻‍♂️",
    "كامل تهربو من الحاجة طويلة لي عندي....😾",
    "فيك ريحة روح دوش...😾🤦🏻‍♂️",
    "كي نكون نرابي الكلبة تطاكي....تستنا فيا ننبح ياجحش🙂",
    "اعشق النساء.....هممم💋",
    "عزيز وخليل أسياد ساحة ياسادة....☢️",
    "نايو يراقب 👀",
    "وينك؟ الدنيا فاضية بدونك 👻",
    "نايو سهران يفكر فيك 🌙",
    "يا سلام! نايو موجود دايمًا لك 😎",
    "ناديتني؟ قلبي معاك 💖",
    "نايو هنا، وش عندك؟ 😏",
    "الجو بارد بس نايو يدفيك 🔥",
    "وينك مختفي؟ نايو ينتظرك 🕒",
    "نايو يفكر: إنت ليه كيوت كذا؟ 😻",
    "هلا بالغالي! سيكو جاهز للدردشة 🌟",
    "نايو يقول: خليك قريب دايمًا 🫶"
  ];

  if (!global.usedResponses) {
    global.usedResponses = new Map();
  }

  let usedResponses = global.usedResponses.get(threadID) || [];

  if (usedResponses.length >= tl.length) {
    usedResponses = [];
  }

  let availableResponses = tl.filter(response => !usedResponses.includes(response));

  let rand = availableResponses[Math.floor(Math.random() * availableResponses.length)];

  usedResponses.push(rand);
  global.usedResponses.set(threadID, usedResponses);

  if (event.body.indexOf("NYO") == 0 || (event.body.indexOf("بوت") == 0)) {
    var msg = {
      body: `${rand}`
    }
    return api.sendMessage(msg, threadID, messageID);
  }
}

module.exports.run = function ({ api, event, client, __GLOBAL }) { }