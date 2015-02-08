.PHONY: setup
setup:
	npm install
.PHONY: server
server:
	PORT=8080 node_modules/.bin/nodemon server.js