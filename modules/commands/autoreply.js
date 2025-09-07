
module.exports.config = {
  name: "autoreply",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "Alice",
  description: "Auto reply to all messages",
  commandCategory: "system",
  usages: "[on/off] [message]",
  cooldowns: 2
};

module.exports.handleEvent = async ({ api, event }) => {
  const { senderID, threadID, body } = event;
  let settings;
  try {
    settings = require("../../autoreply.json");
  } catch (err) {
    settings = { enabled: false, message: "" };
  }
  
  if (!settings.enabled || !settings.message) return;
  if (senderID == api.getCurrentUserID()) return;
  
  try {
    await api.sendMessage(settings.message, threadID);
  } catch (err) {
    console.error("Error sending autoreply:", err);
  }
};

module.exports.run = async function({ api, event, args }) {
  const fs = require("fs-extra");
  const { threadID } = event;
  const content = args.slice(1).join(" ");
  
  if (!args[0]) return api.sendMessage("Please specify on/off and message", threadID);

  let settings = { enabled: false, message: "" };
  try {
    settings = JSON.parse(fs.readFileSync("autoreply.json", "utf8"));
  } catch (err) {
    settings = { enabled: false, message: "" };
  }

  if (args[0] == "on") {
    settings.enabled = true;
    if (content) settings.message = content;
    api.sendMessage(`✅ Enabled auto-reply with message: ${settings.message}`, threadID);
  }
  else if (args[0] == "off") {
    settings.enabled = false;
    api.sendMessage("❌ Disabled auto-reply", threadID);
  }

  fs.writeFileSync("autoreply.json", JSON.stringify(settings, null, 2));
}