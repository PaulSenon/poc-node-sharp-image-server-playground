import fs from 'fs';

export default class MemoryDebugger {
  private interval?: NodeJS.Timeout;

  public start(interval: number): void {
    // create csv file (override) and open to write lines
    const file = fs.createWriteStream('memory.csv');
    file.write('timestamp,rss,heapTotal,heapUsed,external,arrayBuffers\n');

    this.interval = setInterval(() => {
      const { rss, heapTotal, heapUsed, external, arrayBuffers } = process.memoryUsage();
      const timestamp = Date.now();
      file.write(`${timestamp},${rss},${heapTotal},${heapUsed},${external},${arrayBuffers}\n`);
    }, interval);
  }

  public stop(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
