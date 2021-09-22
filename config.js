module.exports = mongodb_uri = () => {
  require("dotenv").config();
  const username = encodeURIComponent(process.env.DATABASE_USER);
  const password = encodeURIComponent(process.env.DATABASE_PASSWD);
  const clusterUrl = "yourprogress.aborr.mongodb.net";
  const authMechanism = "DEFAULT";
  const uri = `mongodb+srv://${username}:${password}@${clusterUrl}/your_progress?authMechanism=${authMechanism}`;
  return uri
};



