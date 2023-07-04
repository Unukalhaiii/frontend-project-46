install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

gendiff -h:
	node bin/gendiff.js help gendiff

