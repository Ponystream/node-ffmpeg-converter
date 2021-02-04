import fs from 'fs';
import chalk from 'chalk';
import hound from 'hound';
import moment from 'moment';

const ffmpeg = require('fluent-ffmpeg');
let movies = [];
let currentConverting = null;
let watcher = null;
let alreadyConverted = [];

export async function ffmpegConvert(options) {
    if (watcher === null) watchingNewFile(options);
    movies = getFilesFromPathAndExtensions(options['--path'], options['--input-ext']);
    if (options['--path']) movies = movies.filter(movie => !alreadyConverted.includes(movie));

    if (movies.length) {
        console.log(`${chalk.green.bold(movies.length)} movies remaining to convert`);
        convert(movies[0], options);
    } else {
        console.log(chalk.blue.bold('No more movie to convert'));
    }
}

function watchingNewFile(options) {
    watcher = hound.watch(options['--path'], []);
    watcher.on('create', function (file, stats) {
        const movie = file.replace(`${options['--path']}/`, '');
        console.log(`${movie} ${chalk.blue('has been added')}`);
        if (currentConverting === null) {
            ffmpegConvert(options);
        }
    })
}

function getFilesFromPathAndExtensions(path, extensions) {
    let files = fs.readdirSync(path);
    return files.filter(file => file.match(new RegExp(`.*\.(${extensions.join('|')})`, 'ig')));
}

function convert(filepath, options) {
    let startTime = null;
    try {
        console.log(`Starting conversion of ${chalk.underline(filepath)} to ${chalk.blue(options['--output-ext'])}`);
        const inputPath = options['--path'] + '/' + filepath;
        const outputPath = inputPath.substring(0, inputPath.length - 3).concat('mp4');
        ffmpeg(inputPath)
            .toFormat(options['--output-ext'])
            .output(outputPath)
            .on('start', () => {
                currentConverting = filepath;
                startTime = moment();
            })
            .on('progress', function (progress) {
                process.stdout.write(`Processing: ${chalk.blue.bold(progress.percent.toFixed(2))}%\r`);
            })
            .on('error', function (err, stdout, stderr) {
                console.log('Cannot process video: ' + err.message);
            })
            .on('end', () => {
                options['--delete-source'] ? fs.unlinkSync(inputPath) : alreadyConverted.push(filepath);
                currentConverting = null;
                const timeElapsed = moment.duration(moment().diff(startTime)).humanize();
                console.log(chalk.green.bold(`Finished processing. Elapsed: ${timeElapsed}`));
                ffmpegConvert(options);
            })
            .run();
    } catch (e) {
        console.log(e);
    }
}