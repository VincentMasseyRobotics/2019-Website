find . -type f -name "*.png" -o -name "*.PNG" | xargs optipng -nb -nc
find . -type f -name "*.png" -o -name "*.PNG" | xargs advpng -z4
find . -type f -name "*.png" -o -name "*.PNG" | xargs pngcrush -rem gAMA -rem alla -rem cHRM -rem iCCP -rem sRGB -rem time -ow
find . -type f -name "*.jpg" -o -name "*.JPG" | xargs jpegoptim -f --strip-all
