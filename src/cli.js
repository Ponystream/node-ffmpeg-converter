import {ffmpegConvert} from './main';
import chalk from 'chalk';
import arg from 'arg';

function parseArgs(rawArgs) {
    return arg(
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
    );
}

function displayHelp() {
    console.log(chalk.blue('### NodeJS FFmpeg converter ###'));
    console.log(chalk.blue('--help, -h') + '     : To get this help');
    console.log(chalk.blue('--path, -p') + '     : Required. String. Indicates path for movies to convert');
    console.log(chalk.blue('--input-ext') + '    : Optional. Array.  Indicates the input extensions to look for. Default .avi, .mkv');
    console.log(chalk.blue('--output-ext') + '   : Optional. String. Indicates the output extension. Default .mp4');
    console.log(chalk.blue('--delete-source') + ': Optional. Boolean. Indicates if the source must be deleted. Default false');
    console.log();
    console.log('example: ', chalk.yellow('ffmpeg-converter -d --path=/User/xxx/movies/ -i=mkv -i=avi'));
    console.log('example: ', chalk.yellow('ffmpeg-converter --path /User/xxx/movies/ --output-ext avi'));
    console.log();
    console.log(chalk.cyan('This tool walks the given location and its sub-folders'));
    console.log(chalk.cyan('A watcher is started and trigger conversion if a new compatible movie is found'));
}

export function cli(rawArgs) {
    try {
        const args = parseArgs(rawArgs);
        if (Object.keys(args).length < 2 || args['--help']) {
            displayHelp();
        } else {
            args['--input-ext'] = args['--input-ext'] || ['avi', 'mkv'];
            args['--output-ext'] = args['--output-ext'] || 'mp4';
            args['--delete-source'] = args['--delete-source'] || false;

            console.log(chalk.red(`Convert of all ${args['--input-ext'].join('|')} to ${args['--output-ext']} ${args['--delete-source'] ? chalk.underline('and delete source') : 'and keep source'}`))
            ffmpegConvert(args).then(res => console.log(res));
        }
    } catch (e) {
        console.log(e);
    }
}