module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "https://weatherinfo-backend.herokuapp.com",
      },
    },
  },
};
