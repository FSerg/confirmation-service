const getDateStr = d => {
  if (!d) return "";

  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false
  };
  return new Intl.DateTimeFormat("ru-RU", options).format(new Date(d));
};

const getShortDateStr = d => {
  if (!d) return "";

  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  };
  return new Intl.DateTimeFormat("ru-RU", options).format(new Date(d));
};

const getUpdateStr = d => {
  if (!d) return "";
  return `Обновлено: ${getDateStr(d)}`;
};

const getAuthData = () => {
  const user1C = process.env.REACT_APP_USERNAME;
  const pass1C = process.env.REACT_APP_USERPASS;
  const username = unescape(encodeURIComponent(user1C));
  const password = unescape(encodeURIComponent(pass1C));

  const authData = {
    Authorization: "Basic " + btoa(username + ":" + password)
  };
  return authData;
};

module.exports = {
  getDateStr,
  getShortDateStr,
  getUpdateStr,
  getAuthData
};
