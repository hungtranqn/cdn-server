import 'suu';

import os from 'os';
import path from 'path';
import fs from 'fs';
import {fork} from 'child_process';
import merge from 'merge';

console.log(suu);

let child = fork('./test/test_process_child.js', ['--test-mode=1', '--test-value=2'], {
    env: suu.extend({}, process.env, {
        test_key_1: 'test_value_1',
        test_key_2: 'test_value_2',
        test_key_3: 'test_value_3',
        test_started_by: 'shd',
        parent_pid: process.pid
    })
});

console.log('Child Process PID: ', child.pid);