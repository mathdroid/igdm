const Client = require("instagram-private-api").V1;

let device = undefined;
let storage = undefined;

const login = async (username, password) => {
  device = new Client.Device(username);
  storage = new Client.CookieFileStorage(
    __dirname + `/ig-cookie.${username}.json`
  );

  const session = await Client.Session.create(
    device,
    storage,
    username,
    password
  );
  return session;
};

const getInbox = async session => await new Client.Feed.Inbox(session);

const getAllInbox = async inbox => await inbox.all();

const getThreadById = async (session, id) =>
  await Client.Thread.getById(session, id);

const replyToThread = async (thread, text) => await thread.broadcastText(text);

module.exports = { login, getInbox, getAllInbox, getThreadById, replyToThread };
