export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://root:12345678@127.0.0.1:27017/clean-node-api?authSource=admin',
  PORT: process.env.PORT ?? 5050,
  JWT_SECRET: process.env.JWT_SECRET ?? '/cLtgeTvdWfE64U2riqRMKjHxlCMvdh9XJpG24aIyeY='
}
