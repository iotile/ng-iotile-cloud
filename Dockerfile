FROM markadams/chromium-xvfb

RUN apt-get update && apt-get install -y curl gnupg

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs git && npm install -g npm@latest gulp-cli 

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/ 
RUN npm install

# Add your source files
# COPY . /usr/src/app
COPY *.js /usr/src/app/
COPY *.json /usr/src/app/
COPY src /usr/src/app/src

ENTRYPOINT ["npm"]
CMD ["test"]  