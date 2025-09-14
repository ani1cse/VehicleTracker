import admin from "firebase-admin";
import fs from "fs";

const serviceAccount = JSON.parse(
  fs.readFileSync("./serviceAccountKey.json", "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function setAdmin(uid) {
  await admin.auth().setCustomUserClaims(uid, { role: "admin" });
  console.log(`✅ Admin role set for UID: ${uid}`);
}

setAdmin("nTVOjJDIEJfqfIm2Ddt7MGb0cZu1");



