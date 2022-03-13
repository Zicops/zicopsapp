FROM node:lts as dependencies
WORKDIR /zicopsapp
COPY package.json ./
RUN npm install

FROM node:lts as builder
WORKDIR /zicopsapp
COPY . .
COPY --from=dependencies /zicopsapp/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /zicopsapp
ENV NODE_ENV production
# If you are using a custom next.config.js file, uncomment this line.
# COPY --from=builder /zicops-app/next.config.js ./
COPY --from=builder /zicopsapp/public ./public
COPY --from=builder /zicopsapp/.next ./.next
COPY --from=builder /zicopsapp/node_modules ./node_modules
COPY --from=builder /zicopsapp/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]