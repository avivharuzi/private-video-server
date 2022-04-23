# Private Video Server

A very simple private video server.

> ⚠️ This project is open source but made for self usage if you like this project feel free to star and fork this repository.
>
> ⚠️ Any problem with this project or security issues is your responsibility to handle them.
>
> ⚠️ No issues or pull requests will be accepted.

## Table of Contents

1. [Overview](#overview)
2. [Tech](#tech)
3. [Prerequisites](#prerequisites)
4. [Configure Environment File](#configure-environment-file)
5. [Commands](#commands)

## Overview

The idea of this project is to make a collection of simple videos and to watch them easily (currently only `mp4` files are supported).

The main usage of this project to make it as a server and to access it outside.

The main security is that always is there one admin user that can access to the server resources which configured in the `.env` file.

## Tech

- Nx Workspace
- TypeScript
- Angular
- NodeJS
- NestJS
- SQLite
- FFMPEG

## Prerequisites

- Linux OS (not tested on Windows yet)
- [Node.js](https://nodejs.org) (>= 16 required)
- npm package manager (>= 8 required)
- [ffmpeg](https://ffmpeg.org)

## Configure Environment File

Before developing or running any commands you should configure environment file to make everything work as expected.

1. Copy `.env.example` content and create new file `.env` and paste the content there.
2. Update the values after `=` for your right needs
3. Please notice `API_MEDIA_DIRECTORY` should be with absolute path

## Commands

Run locally api and web applications.

- api: `localhost:8080`
- web: `localhost:4200`

```shell
npm run start:local
```

Build with production configuration for api and web applications.

```shell
npm run build:prod-server
```

Serve production build.

Will run on `localhost:8080`

```shell
npm run serve:prod-server
```

Stop serving production build.

```shell
npm run stop:prod-server
```

Build and serve production build in the same command.

```shell
npm run build-and-serve:prod-server
```

# License

[MIT](LICENSE)
