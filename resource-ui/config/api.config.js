let baseUrl = "";
if (process.env.NODE_ENV === "development") {
  baseUrl = "http://4999.gr326f96.goodrain.ali-sh.goodrain.net:80";
} else if (process.env.NODE_ENV === "production") {
  baseUrl = "http://4999.gr326f96.goodrain.ali-sh.goodrain.net:80";
}

const apiconfig = {
  baseUrl,
};
export default apiconfig;