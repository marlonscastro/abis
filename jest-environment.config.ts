// test-environment.ts
import dotenv from 'dotenv'
import { Config } from '@jest/types';
import NodeEnvironment from "jest-environment-node";

class JestTestEnvironment extends NodeEnvironment {
  constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
    super(config, context)
  }

  async setup(): Promise<void> {
    await super.setup();

    dotenv.config({ path: '.env' })
    // this.global.authToken = token;
    jest.setTimeout(10000)
  }

  async teardown(): Promise<void> {
    await super.teardown();
  }
}

export default JestTestEnvironment;