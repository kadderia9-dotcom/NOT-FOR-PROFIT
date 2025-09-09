const axios = require("axios");

module.exports = {
  config: {
    name: "سيم",
    version: "1.0.0",
    credits: "SIFO",
    description: "دردشة مع سيم",
    commandCategory: "chatbot",
    usages: "sim [الكلمة/السؤال]",
    cooldowns: 2
  },

  run: async ({ api, event, args }) => {
    const { threadID, messageID } = event;
    const question = args.join(" ");

    if (!question) {
      return api.sendMessage("❌ اكتب كلمة أو سؤال.\n\nمثال: sim مرحبا", threadID, messageID);
    }

    try {
      
      const res = await axios.get("http://79.99.40.71:6375/chat", {
        params: { word: question },
        headers: { api_key: "sifoanter123" }
      });

      const reply = res.data.message || "⚠️ ماكانش رد.";
      api.sendMessage(reply, threadID, messageID);
    } catch (err) {
      console.error(err);
      return api.sendMessage("❌ ماقدرتش نتصل بسيرفر سيم.", threadID, messageID);
    }
  }
};
