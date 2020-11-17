install: install-deps

install-deps:
	npm ci

test:
	npx -n --experimental-vm-modules jest --watch      //npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

gendiff:
	node bin/gendiff.js -h

lint:
	npx eslint .

publish:
	npm publish --dry-run

test-coverage:
	npm test -- --coverage
