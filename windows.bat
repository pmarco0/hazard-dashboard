set folder=dashboard
set publicassets=public
rd .\release\%folder%\ /S /Q 
mkdir release\%folder%
mkdir release\%folder%\%publicassets%
xcopy app.js release\%folder%\
xcopy index.html release\%folder%\
xcopy /E %publicassets% release\%folder%\%publicassets%\
rd .\release\%folder%\%publicassets%\assets\compiled-js\ /S /Q 
mkdir release\%folder%\%publicassets%\assets\compiled-js
cmd /C browserify .\%publicassets%\assets\js\init.js -o .\release\%folder%\%publicassets%\assets\compiled-js\bundle.js
cmd /C minify --output .\release\%folder%\%publicassets%\assets\compiled-js\bundle.min.js .\release\%folder%\%publicassets%\assets\compiled-js\bundle.js
echo "Server Running"
node ./release/dashboard/app.js
pause