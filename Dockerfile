FROM node:boron-slim
ENV HOME=/code
WORKDIR /code
EXPOSE 3000
RUN npm install
RUN npm cache clean
CMD ["npm", "start"]
