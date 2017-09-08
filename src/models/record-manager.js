import MatrixRecorder from './matrix-recorder';
import MatrixRunner from './matrix-runner';

export default class RecordManager {
    /**
     * @param {MatrixRunner} runner
     */
    constructor(runner) {
        this.runner = runner;
        const { alphabet, rows, cols } = this.runner.matrix;

        this.recorder = new MatrixRecorder({
            alphabet,
            size: { rows, cols },
        });

        this.onData = this.onData.bind(this);

        this.runner.on('data', this.onData);
    }

    setup() {

    }

    onData(data, now) {
        // data.forEach(l => this.recorder.record(l, now));
        this.recorder.record([now, data]);
    }

    dispose() {
        this.runner.removeListener(this.onData);
        this.runner = null;
        this.recorder = null;
    }
}