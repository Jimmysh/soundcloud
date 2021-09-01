import * as yargs from 'yargs';
import * as shell from 'shelljs';
import { words, escape, lowerCase } from 'lodash';

const argv = yargs.option('appName', { type: 'string', default: 'Foo/Bar003' }).argv;

const apps: string[] = shell
  .exec('heroku apps')
  .stdout.split('\n')
  .filter(d => !!d && !d.startsWith('=='));

const appName = words(argv.appName).map(escape).map(lowerCase).join('-');

if (!apps.includes(appName)) {
  shell.exec(`heroku create ${appName} --buildpack heroku/nodejs`);
}

shell.exec(`heroku git:clone --app ${appName}`);
// shell.rm('dist/apps/soundcloud/*.json');
// shell.cp('apps/soundcloud/docker/**', 'dist/apps/soundcloud');

// shell.exec(`heroku create ${argv.appName}`);
console.log('deploy heroku !', appName);
// yarn run:tools tools/heroku/deploy
