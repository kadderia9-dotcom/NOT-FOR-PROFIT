const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "حذف",
    version: "1.0",
    author: "عزيز",
    countDown: 5,
    role: 2,
    shortDescription: "🗑️ مسح جميع الأوامر",
    longDescription: "🔥 يمسح كامل الملفات من مجلد commands دفعة واحدة",
    category: "⚡ الأدوات ⚡",
    guide: "{pn}"
  },

  onCall: async function ({ message }) {
    try {
      const commandsPath = path.join(__dirname);
      const files = fs.readdirSync(commandsPath);

      if (files.length === 0) {
        return message.reply("📂 المجلد فارغ، ماكانش أوامر نحذفهم.");
      }

      for (const file of files) {
        if (file !== "حذف.js") { 
          fs.unlinkSync(path.join(commandsPath, file));
        }
      }

      return message.reply("🔥💀 جميع الأوامر في ⚡commands⚡ تحذفو بنجاح ✅🚮");
    } catch (err) {
      return message.reply("❌ خطأ: " + err.message);
    }
  }
};