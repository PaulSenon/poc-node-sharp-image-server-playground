# POC with express and sharp

This is a POC to test the sharp library to resize images in a express server.
This is meant to be a playground to test the sharp library and other things in order to build a lambda function to resize images that is efficient and fast.

Features:

* Typescript
* swc
* prettier
* eslint
* dockerized
* Sharp
* Zod validation
* Express

## Installation

### Requirements

* docker
* docker compose
* make

### Steps

1. Clone the repository
2. Run `make install` to install the dependencies
3. Run `make dev` to start the project in dev
4. Go to `http://localhost:8080` (or any port configured in .env `DEV_PORT`) to see the project running

### Endpoint usage

* `GET /image` - Resize an image
  * `src`: string **[REQUIRED]** - image name from folder `images` (e.g. `image-1.jpg`)
  * `w`: number - target width in pixel (e.g. `200`) (you can use `w` or `h` or both, but at least one is required)
  * `h`: number - target height in pixel (e.g. `200`) (you can use `w` or `h` or both, but at least one is required)
  * `fit`: cover | contain | fill | inside | outside - how to fit the image when constraining both width and height (e.g. `cover`) (default: `cover`)
  * `type`: avif | jpg | png | webp | matchSource | auto - output image type (e.g. `webp`) (default: `auto`)
  * `q`: number 0-100 - quality of the output image (for lossy types only) (e.g. `80`) (default: `75`)

### Tools

* There is a `debug.html` file you can open in your browser. It is meant to test cache policies loading a `<img/>` tag in the DOM.

## Commands

* `make install` - Install the dependencies
* `make dev` - Start the project in dev mode
* `make clean` - Clean everything (docker images, volumes, node_modules, dist, etc.)
* `make quality` - Run the quality checks (eslint, prettier etc.)
* `make bash` - Open a bash inside the container (to install new dependencies, or run any other command)

## License

feel free to use it as you want
