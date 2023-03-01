# ExpressJS Mock publisher webhooks template
### How to run manually (node & npm required)
IV='[IV GOES HERE]' KEY='[KEY GOES HERE]' npm start

### How to build docker image
docker build -t appcharge/webhook-express .

### How to run the container locally
docker run --rm -it -e KEY='[KEY GOES HERE]' -e IV='[IV GOES HERE]' -e APP_SECRET='[FACEBOOK APP SECRET]' -p8080:8080 appcharge/webhook-express
