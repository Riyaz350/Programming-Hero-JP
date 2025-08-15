import "dotenv/config";

const config = {
  mongodb: {
    uri: process.env.MONGODB_URI
  },
};

export default config;