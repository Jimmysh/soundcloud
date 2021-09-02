import { escape, lowerCase, words } from 'lodash';
import { cwd } from 'process';
import { join } from 'path';
import * as shell from 'shelljs';
import * as yargs from 'yargs';

const argv = yargs
  .option('gitPath', { type: 'string', default: join(cwd(), 'deploy-apps') })
  .option('appName', { type: 'string', default: 'default' })
  .option('copyPath', { type: 'string', default: join(cwd(), 'apps/soundcloud/docker') }).argv;

const apps: string[] = shell
  .exec('heroku apps')
  .stdout.split('\n')
  .filter(d => !!d && !d.startsWith('=='));

const appName = words(argv.appName).map(escape).map(lowerCase).join('-');

if (!apps.includes(appName)) {
  shell.exec(`heroku create ${appName} --buildpack heroku/nodejs`);
}
const cloneFilder = join(argv.gitPath, appName);
shell.exec(`heroku git:clone --app ${appName} ${cloneFilder}`);

shell.ls('-A', cloneFilder).forEach(d => {
  if (d !== '.git') {
    shell.rm('-rf', join(cloneFilder, d));
  }
});

shell.cp('-R', 'dist/apps/soundcloud/*', cloneFilder);
shell.cp('-R', 'apps/soundcloud/docker/*', cloneFilder);
shell.cd(cloneFilder);
shell.exec('git add *');
shell.exec('git commit -m "update"');
shell.exec('git push -f');

console.log('deploy heroku !', appName);
// yarn run:tools tools/heroku/deploy
