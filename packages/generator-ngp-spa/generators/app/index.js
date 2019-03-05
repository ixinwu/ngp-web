const mkdirp = require('mkdirp');
const ejs = require('ejs');
const Generator = require('yeoman-generator');
const welcome = require('./welcome');
const prompts = require('./prompts');
const utils = require('../../utils');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('skip-welcome-message', {
      desc: 'Skip the welcome message',
      type: Boolean,
      defaults: false,
    });
    this.option('skip-install');
  }

  initializing() {
    if (!this.options['skip-welcome-message']) {
      this.log(welcome);
    }
  }

  async prompting() {
    const answers = await this.prompt(prompts);

    this.log('app name', answers.appName);
    this.log('app key', answers.appKey);

    this.answers = answers;
  }

  paths() {
    const baseName = utils.yeoman.getBaseDir();
    if (baseName !== this.answers.appKey) {
      const destPath = this.destinationRoot(this.answers.appKey);
      mkdirp.sync(destPath);
    }

    this.config.save();
  }

  writing() {
    const context = {
      ...this.answers,
    };

    // this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), {
    //   title: 'My App',
    // });

    this.fs.copy(this.templatePath(), this.destinationPath(), {
      globOptions: { dot: true },
      process: contents => {
        const str = contents.toString();
        const template = ejs.compile(str);
        return template(context);
      },
    });
  }

  install() {
    this.yarnInstall();
  }
};
