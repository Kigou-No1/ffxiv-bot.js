FROM oven/bun:alpine

# Config Bun
ENV PATH="~/.bun/bin:${PATH}"
RUN ln -s /usr/local/bin/bun /usr/local/bin/node

# Update packages
RUN echo https://downloads.1password.com/linux/alpinelinux/stable/ >> /etc/apk/repositories
RUN wget https://downloads.1password.com/linux/keys/alpinelinux/support@1password.com-61ddfc31.rsa.pub -P /etc/apk/keys

RUN apk update
# Install Git
RUN apk add git openssh 1password-cli
RUN bun install