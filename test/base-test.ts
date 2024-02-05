import { exec } from 'child_process';

export class BaseTest {
  constructor() {}
  public async init(): Promise<void> {
    const { stdout, stderr } = await exec('npm run setup:test:box');
    if (stderr) {
      console.log(`stderr: ${stderr}`);
    }
    console.log(`stdout: ${stdout}`);
  }

  public async destroy(): Promise<void> {
    const { stdout, stderr } = await exec('npm run db:test:drop');
    if (stderr) {
      console.log(`stderr: ${stderr}`);
    }
    console.log(`stdout: ${stdout}`);
  }
}
