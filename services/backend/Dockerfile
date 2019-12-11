FROM node:10.15.3-alpine

# Arguments & Environments
ARG SERVICE_PATH
ENV SERVICE_PATH=$SERVICE_PATH

# Labeling
LABEL maintainer="Seokju Na <seokju.me@gmail.com>"

# Update requirements
RUN apk --update add git openssh bash

# Copy projects
RUN mkdir /app
WORKDIR /app
COPY ./ ./

# Install rush
RUN node common/scripts/install-run-rush.js check
RUN node common/scripts/install-run-rush.js install
RUN node common/scripts/install-run-rush.js rebuild

# Run service
WORKDIR ${SERVICE_PATH}
ENV NODE_ENV production
CMD ["npm", "run", "start"]
