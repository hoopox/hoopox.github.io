#!/bin/bash

cd $(dirname $0)
npm run dist || exit 1

# tar zcvf dist.tar.gz css favicon.ico images index.html js || exit 1
cd dist
tar zcvf ../dist.tar.gz ./ || exit 1
cd -
scp dist.tar.gz root@web-static.prod.hoopox.com:/tmp/ || exit 1
ssh root@web-static.prod.hoopox.com tar zxvf /tmp/dist.tar.gz -C /var/www/hoopox-static || exit 1

echo done.
