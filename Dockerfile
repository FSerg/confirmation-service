FROM mhart/alpine-node:11
WORKDIR /app
COPY . .
# Install dependencies
RUN cd client && \
    npm install react-scripts -g --silent && \
    yarn install

ARG REACT_APP_USERNAME
ARG REACT_APP_USERPASS
ARG REACT_APP_APIURL
ENV REACT_APP_USERNAME $REACT_APP_USERNAME
ENV REACT_APP_USERPASS $REACT_APP_USERPASS
ENV REACT_APP_APIURL $REACT_APP_APIURL

RUN yarn build && \
    cd .. && \
    \
    yarn install

# start server
CMD [ "yarn", "start" ]