# DiapixApp
The diapixUK is a dialogue elicitation technique and set of materials developed by Baker and Hazan (2011) and based on the Diapix task of van Engen et al (2010).

It consists of 12 ‘spot the difference’ picture tasks that have to be solved cooperatively by pairs of participants. For more information, [see our website](http://www.phon.ucl.ac.uk/project/kidLUCID/diapix.php)!

To be [transferred to diapixUK](https://help.github.com/articles/transferring-a-repository/)

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

## Differences
± 10

#### Beach 1:
difference | x | y
------------- | --- | --- |
1 | 943 | 403
2 | 942 | 265
3 | 809 | 261
4 | 711 | 207
5 | 573 | 374
6 | 593 | 548
7 | 103 | 534
8 | 115 | 314
9 | 50 | 226
10 | 128 | 83
11 | 227 | 131
12 | 485 | 276

#### Beach 2:
difference | x | y
------------- | --- | --- |
1 | 924 | 273
2 | 824 | 122
3 | 953 | 135
4 | 763 | 108
5 | 909 | 415
6 | 396 | 60
7 | 138 | 115
8 | 66 | 135
9 | 183 | 223
10 | 48 | 519
11 | 425 | 448
12 | 926 | 544

#### Farm 1:
difference | x | y
------------- | --- | --- |
1 | 655 | 204
2 | 635 | 271
3 | 986 | 326
4 | 728 | 415
5 | 960 | 448
6 | 236 | 401
7 | 156 | 233
8 | 57 | 164
9 | 209 | 151
10 | 255 | 582
11 | 271 | 322
12 | 736 | 543
