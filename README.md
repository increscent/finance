# Finance App
### (How I track my finances)

## Development

Dependencies:
* node/npm
* mongodb

How to run:
* `sudo systemctl start mongod`
* `npm install`
* `npm run build`
* Run simultaneously:
  * `npm run watch-less`
  * `npm run watch-react`
  * `npm run watch-server`

Visit `localhost:45678`

## Production

How to run:
* `sudo systemctl enable mongod`
* `sudo systemctl start mongod`
* `npm install`
* `npm start`
