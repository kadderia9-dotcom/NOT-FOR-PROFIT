// keepAlive.js
const url = "https://not-for-profit.onrender.com";
const interval = 30000; // 30 seconds

async function ping() {
  try {
    const res = await fetch(url, { method: "GET" });
    if (res.ok) {
      console.log("✅ Request successful");
    } else {
      console.log("❌ Request failed");
    }
  } catch (err) {
    console.log("❌ Request failed");
  }
}

ping();
setInterval(ping, interval);