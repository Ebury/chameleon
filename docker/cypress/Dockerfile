FROM cypress/browsers:node16.16.0-chrome107-ff107

ARG UID=1000
ARG GID=1000

ENV TERM=xterm \
    LANG=C.UTF-8 \
    LANGUAGE=C.UTF-8 \
    LC_ALL=C.UTF-8 \
    TIMEZONE=Europe/London

RUN npm install npm@8 -g

# Change node's user UID/GUI to actual host user's UID/GID
RUN if [ "$UID" -ne "1000" ]; then \
      grep -qE [a-z]:[a-z]:${UID}: /etc/passwd ; \
      if [ $? -ne 0 ]; then \
        groupadd -g ${GID} -f group-host-gid; \
        usermod -u ${UID} -g ${GID} node; \
      else \
        echo UID from USER_ID variable can not be used in the image as it is already exists; exit 1; \
      fi \
    fi

RUN chown -R ${UID}:${GID} /home/node

VOLUME /home/node/app
WORKDIR /home/node/app

USER node
