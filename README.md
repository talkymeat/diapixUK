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

## we usin SASS
it's in `scss/style.scss`, and run `gulp` or `gulp sass` to get it into minified version, linked from `index.html`

## we usin jQuery, Node & Vanilla JS
it's in `www/js/main.js`. Server stuff is `server.js`, `www/js/app.js`

## Dependencies
- [Bower](http://bower.io/) for managing front-end packages
- gulp
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

#### Beach 4:
difference | x | y
------------- | --- | --- |
1 | 986 | 83
2 | 854 | 127
3 | 582 | 80
4 | 727 | 213
5 | 903 | 405
6 | 821 | 508
7 | 658 | 401
8 | 336 | 157
9 | 221 | 293
10 | 370 | 349
11 | 274 | 450
12 | 150 | 507

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

#### Farm 2:
difference | x | y
------------- | --- | --- |
1 | 903 | 227
2 | 638 | 173
3 | 817 | 293
4 | 196 | 79
5 | 434 | 260
6 | 917 | 464
7 | 844 | 467
8 | 754 | 570
9 | 336 | 470
10 | 215 | 536
11 | 149 | 376
12 | 463 | 104

#### Farm 4:
difference | x | y
------------- | --- | --- |
1 | 985 | 93
2 | 862 | 197
3 | 728 | 163
4 | 979 | 374
5 | 697 | 350
6 | 958 | 540
7 | 429 | 543
8 | 247 | 186
9 | 480 | 175
10 | 43 | 512
11 | 345 | 255
12 | 423 | 349

#### Street 2:
difference | x | y
------------- | --- | --- |
1 | 874 | 213
2 | 954 | 270
3 | 908 | 349
4 | 690 | 36
5 | 606 | 157
6 | 473 | 85
7 | 533 | 530
8 | 316 | 432
9 | 116 | 594
10 | 106 | 155
11 | 253 | 54
12 | 585 | 37

#### Street 3:
difference | x | y
------------- | --- | --- |
1 | 982 | 211
2 | 948 | 407
3 | 627 | 596
4 | 748 | 264
5 | 682 | 126
6 | 867 | 270
7 | 359 | 432
8 | 407 | 248
9 | 234 | 226
10 | 209 | 120
11 | 224 | 415
12 | 62 | 434
