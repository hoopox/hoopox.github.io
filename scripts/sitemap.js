#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const moment = require('moment');

const now = moment().utcOffset(0).format('YYYY-MM-DDTHH:mm:ssZ');

const siteMap = fs.readFileSync(path.resolve('./scripts/sitemap.xml')).toString();
const result = siteMap.replace(/%lastModified%/g, now);

fs.writeFileSync(path.resolve('./dist/sitemap.xml'), result);
