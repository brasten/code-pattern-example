module.exports = {
  files: ['src/**/*.test*'],
  extensions: [ "ts" ],
  require: [
    "ts-node/register"
  ],
	ignoredByWatcher: ['{coverage,docs,media,test-types,test-tap}/**']
}
