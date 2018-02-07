# vegas-aframe

An prototype based on [VEGAS JS](https://bitbucket.org/ekameleon/vegas-js) and [AFrame](https://aframe.io/).

### About

 * Author : Marc ALCARAZ (aka eKameleon) - Creative Technologist and Digital Architect
 * Mail : ekameleon[at]gmail.com
 * LinkedIn : [https://www.linkedin.com/in/ekameleon/](https://www.linkedin.com/in/ekameleon/)

### License

Under tree opensource licenses :

 * [License MPL 2.0](https://www.mozilla.org/en-US/MPL/2.0/)
 * [License GPL 2.0+](https://www.gnu.org/licenses/gpl-2.0.html)
 * [License LGPL 2.1+](https://www.gnu.org/licenses/lgpl-2.1.html)

#### ⌜ Slack Community

![slack-logo-vector-download.jpg](https://bitbucket.org/repo/AEbB9b/images/3509366499-slack-logo-vector-download.jpg)

Send us your email to join the **VEGAS** community on Slack !

## Building the libraries

We use [Yarn](https://yarnpkg.com/) with a serie of powerful packages (Babel, Rollup, Mocha, etc.) to compile and build this library.

#### ⌜ Building the project

1 - The first time, clone the GIT repository of this project.

2 - Initialize the project :
```
$ yarn
```

3 - Build the **production** version of the application :
```
$ yarn prod
```

4 - Build the **dev** version of the application.
```
$ yarn dev
```

You can listen the change in your code and update the browser with the command :
```
$ yarn watch
```
or
```
$ yarn dev --watch
```

5 - Build all
```
$ yarn build
```

Note: You can copy the **config.json** file and rename the copy in **user.json** to change your custom build settings.

#### ⌜ Test the application in your local browser

We use [browsersync](https://browsersync.io/) to test locally the application.

```
$ yarn dev
```

or

```
$ yarn example
```

