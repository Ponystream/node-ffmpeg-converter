# Node-FFmpeg-Converter

`Node-FFmpeg-Converter` is a quick CLI video converter using [FFmpeg](https://ffmpeg.org/).

## Installation

#### Install FFmpeg conversion software

[Install FFmpeg](https://ffmpeg.org/download.html) according to your operating system from there: https://ffmpeg.org/download.html

#### Install NodeJS package dependencies

Use NPM to install the required dependencies.

```console
$ npm install
```

Use npm link to create a symlink

```console
$ npm link
```

## Usage

`ffmpeg-converter` takes one required argument:


For example:

```console
$ ffmpeg-converter -d -p /home/ponystream/movies -i avi -i mkv -o mp4
```

    {
        '--help': Boolean,
        '--path': String, // --path <string> or --path=<string>
        '--input-ext': [String],
        '--output-ext': String,
        '--delete-source': Boolean,
        '-p': '--path',
        '-h': '--help',
        '-i': '--input-ext',
        '-o': '--output-ext',
        '-d': '--delete-source',
    },

### Arguments

If a second parameter is specified and is an object, it specifies parsing options to modify the behavior of `arg()`.

#### `--help | -h`

Dislay the help, just in case.

For example:

```console
ffmpeg-converter --help
```

#### `--path | -p`

The only required argument. The path of the where the script will start searching for movie to convert.


For example:

```console
ffmpeg-converter --path=/home/ponystream/movies
```

#### `--input-ext | -i`

An array of movie extension. The script will search and convert all the movies having one of theses given extensions.
Default is `['mkv', 'avi']`.

For example:

```console
ffmpeg-converter --path=/home/ponystream/movies -i avi -i mkv
```

#### `--output-ext | -o`

An array of movie extension. The script will search and convert all the movies having one of theses given extensions.
Default is `mp4`.

For example:

```console
ffmpeg-converter --path=/home/ponystream/movies -i avi -i mkv
```

#### `--delete-source | -d`

Request for source deletion after successful conversion.

For example:

```console
ffmpeg-converter --delete-source --path=/home/ponystream/movies -i avi -i mkv
```

### Errors

You will encounter an error if you try to use `ffmpeg-converter` without having `FFmpeg` installed on your system.

# FAQ

### What is [FFmpeg](https://ffmpeg.org/)?

`FFmpeg` is a free and open-source software project consisting of a large suite of libraries and programs for handling video, audio, and other multimedia files and streams.

### Which kind of video format `ffmpeg-converter` can handle?

As the core of the conversion is delegated to `FFmpeg`, you have to rely on its capacities.

### What kind of usage this tool is used for?

The typical usage of this tool is to convert a complete library of movies into a common format.
Some devices cannot handle a certain type of format and require a transcoding step in order to be played.
This step is resource consuming and might not be made on the fly.

### What are the performances of this tool?

The time spent for converting a movie is approximately one hour long for an fullHD mkv movie to mp4. 
Can be lowered, but highly depend on your CPU capabilities, and the movie source.
FFmpeg will require the maximum of your CPU resources.

# License

Copyright &copy; 2021 Ponystream.

Released under [BSD-3-Clause](LICENSE.md).
