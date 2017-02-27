#!/bin/bash 
folder="dashboard"
publicassets="public"
rm -rf release/$folder
mkdir release/$folder
mkdir release/$folder/$publicassets
cp app.js release/$folder
cp index.html release/$folder
cp -R $publicassets release/$folder
rm -rf release/$folder/$publicassets/js
mkdir release/$folder/$publicassets/assets/compiled-js
browserify ./$publicassets/assets/js/init.js -o ./release/$folder/$publicassets/assets/compiled-js/bundle.js
minify --output ./release/$folder/$publicassets/assets/compiled-js/bundle.min.js ./release/$folder/$publicassets/assets/compiled-js/bundle.js
node app.js