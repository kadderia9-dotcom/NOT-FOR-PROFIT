module.exports.config = {
    name: "تحديث التحقق",
    eventType: ["log:unsubscribe"],
    version: "1.0.0",
    credits: "خليلو دفلاوي",
    description: "مسح بيانات تفاعل المستخدم عند الخروج",
};

module.exports.run = async ({ event, api, Threads }) => { 
    if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
    const fs = require("fs");
    const pathA = require('path');
    const thread = require('../modules/commands/tuongtac/checktt/');
    const path = pathA.resolve(__dirname, '../', 'modules', 'commands', 'tuongtac', 'checktt', '6272884602803031.json');
    var threadData = thread.find(i => i.threadID == event.threadID)
    const index = threadData.data.findIndex(item => item.id == event.logMessageData.leftParticipantFbId);
    threadData.data.splice(index, 1);
    fs.writeFileSync(path, JSON.stringify(thread, null, 2), 'utf-8');
}