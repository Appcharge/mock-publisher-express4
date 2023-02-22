# ExpressJS Mock publisher webhooks template
### How to run manually (node & npm required)
IV='[IV GOES HERE]' KEY='[KEY GOES HERE]' npm start

### How to build docker image
docker build -t appcharge/webhook-express .

### How to run the container locally
docker run --rm -it -e KEY='[KEY GOES HERE]' -e IV='[IV GOES HERE]' -p8080:8080 appcharge/webhook-express

### How to test the container locally
curl --location 'http://localhost:8080/updateBalance' --header 'Content-Type: text/plain' --data '[encrypted data]'
