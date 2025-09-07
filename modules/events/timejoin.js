module.exports.config = {
    name: "timejoin",
    eventType: ["log:unsubscribe"],
    version: "2.0.0",
    credits: `━━━━━━━━━━━━━━━━━━
   𝑵𝒀𝑶 𝑻𝒊𝒎𝒆 𝑱𝒐𝒊𝒏 𝑺𝒚𝒔𝒕𝒆𝒎
   ✦ 𝑨𝒛𝒊𝒛 𝑲𝒂𝒅𝒅𝒆𝒓𝒊
     ↳ fb.com/aziz.jr.945350
   ✦ 𝑲𝒉𝒂𝒍𝒊𝒍 𝑫𝒂𝒇𝒍𝒂𝒘𝒊
     ↳ fb.com/KhalilDaflawi44
━━━━━━━━━━━━━━━━━━`,
    description: "Automatically remove user join-time data when they leave"
};

const fs = require("fs");
var path = __dirname + "/../commands/cache/timeJoin.json";

module.exports.run = async function ({ event }) {
    const { threadID, logMessageData } = event;
    const { writeFileSync, readFileSync } = fs;
    const { stringify, parse } = JSON;

    try {
        const userID = logMessageData.leftParticipantFbId;
        let data = parse(readFileSync(path));
        
        // Clear user join time
        data[userID + threadID] = "";
        writeFileSync(path, stringify(data, null, 2));

        console.log(`✅ [NYO] Cleared join-time data for user ${userID} in thread ${threadID}`);
    } catch (err) {
        console.error("❌ [NYO] Error while clearing join-time data:", err);
    }
};