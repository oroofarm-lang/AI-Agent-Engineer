export function readHiddenInput(prompt) {
  return new Promise((resolve, reject) => {
    let value = '';
    const priorRaw = process.stdin.isRaw;
    process.stdin.setRawMode(true);
    process.stdout.write(prompt);
    process.stdin.resume();
    const cleanup = () => {
      process.stdin.off('data', receive);
      process.stdin.setRawMode(Boolean(priorRaw));
      process.stdin.pause();
      process.stdout.write('\n');
    };
    function receive(buffer) {
      for (const char of buffer.toString('utf8')) {
        if (char === '\u0003' || char === '\u0004') {
          cleanup();
          reject(new Error('CANCELLED'));
          return;
        }
        if (char === '\r' || char === '\n') {
          cleanup();
          resolve(value);
          return;
        }
        if (char === '\u007f' || char === '\b') value = value.slice(0, -1);
        else if (char >= ' ') value += char;
      }
    }
    process.stdin.on('data', receive);
  });
}
