const { getCookie } = require("cookies-next");

const { fetch: originalFetch } = window;
window.fetch = async (...args) => {
  let [resource, config] = args;
  console.log(resource, config);
  if (getCookie("accessToken")) {
    options.headers['Authorization'] = `Bearer ${getCookie("accessToken")}`;
}
  const response = await originalFetch(resource, config);
  return response;
};