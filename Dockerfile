FROM mhart/alpine-node:11
WORKDIR /app
COPY . .
# Install dependencies
RUN cd client && \
    npm install react-scripts -g --silent && \
    yarn install && \
    yarn build && \
    cd .. && \
    \
    yarn install

# start server
CMD [ "yarn", "start" ]