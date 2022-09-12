FROM node:lts as dependencies
WORKDIR /zicops-app
COPY package.json ./
RUN npm install

FROM node:lts as builder
WORKDIR /zicops-app
COPY . .
COPY --from=dependencies /zicops-app/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /zicops-app
ENV NODE_ENV production
# If you are using a custom next.config.js file, uncomment this line.
COPY --from=builder /zicops-app/next.config.js ./
COPY --from=builder /zicops-app/public ./public
COPY --from=builder /zicops-app/.next ./.next
COPY --from=builder /zicops-app/node_modules ./node_modules
COPY --from=builder /zicops-app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]