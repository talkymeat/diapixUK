# DiapixApp
The diapixUK is a dialogue elicitation technique and set of materials developed by Baker and Hazan (2011) and based on the Diapix task of van Engen et al (2010).

It consists of 12 ‘spot the difference’ picture tasks that have to be solved cooperatively by pairs of participants. For more information, [see our website](http://www.phon.ucl.ac.uk/project/kidLUCID/diapix.php)!

# Development
## Install ionic via npm
```
npm install -g ionic
cd DiapixApp
ionic emulate android
```
Make sure your AVM emulator is configured through Android Studio.

## Dependencies
- [Bower](http://bower.io/) for managing front-end packages
- npm / node obvs
- jQuery
- fastclick for speeding up in-app clicks
- handlebars for custom re-usable semantic templates
- PouchDB

### Help with node + homebrew + ionic
[1](http://stackoverflow.com/questions/28017374/what-is-the-suggested-way-to-install-brew-node-js-io-js-nvm-npm-on-os-x)
[2](http://stackoverflow.com/questions/26406484/brew-doctor-warning-unbrewed-header-files-were-found-in-usr-local-include)
[3](http://stackoverflow.com/questions/34335340/angular2-quickstart-npm-start-is-not-working-correctly)
