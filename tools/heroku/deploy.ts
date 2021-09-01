import * as yargs from 'yargs';

const argv = yargs.option('appName', { type: 'string' }).argv;

console.log('deploy heroku !', argv);

// yarn run:tools tools/heroku/deploy
