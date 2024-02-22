# Node Typescript Starter

This is a starter project to kickstart a new Node.js project with Typescript.

Features:

* Typescript
* swc
* prettier
* eslint
* dockerized

## Installation

### Requirements

* docker
* docker compose
* make

### Steps

1. Clone the repository
2. Run `make install` to install the dependencies
3. Run `make dev` to start the project in dev

## Commands

* `make install` - Install the dependencies
* `make dev` - Start the project in dev mode
* `make clean` - Clean everything (docker images, volumes, node_modules, dist, etc.)
* `make quality` - Run the quality checks (eslint, prettier etc.)
* `make bash` - Open a bash inside the container (to install new dependencies, or run any other command)

## License

feel free to use it as you want
