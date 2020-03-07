FROM mhart/alpine-node:11

# Install pygments (for syntax highlighting)
RUN apk update && apk add bash && rm -rf /var/cache/apk/*

WORKDIR /app
COPY . .

# Install dependencies
RUN cd client && \ 
    yarn install && \
    cd .. &&\
    \
    yarn install

RUN chmod +x run

# Build app and start server from script
CMD ["/app/run"]