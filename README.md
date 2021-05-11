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
* `cp config.json.example config.json`
* Run simultaneously:
  * `npm run watch-less`
  * `npm run watch-react`
  * `npm run watch-server`

Visit `localhost:45678`

## Production

How to run:
* `sudo systemctl enable mongod`
* `sudo systemctl start mongod`
* `cp config.json.example config.json` (and update `SESSION_SECRET`)
* `npm install`
* `npm start`
