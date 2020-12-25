lint:
		npx eslint .

fix:
		npx eslint --fix .

install:
		npm ci

build:
		rm -rf dist
		NODE_ENV=production npx webpack