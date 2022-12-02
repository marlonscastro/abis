const { resolve } = require('path');
const root = resolve(__dirname);

const rootConfig = require(`${root}/jest.config.ts`);

export default {
    ...rootConfig, ...{
        rootDir: root,
        displayName: "#### Integration Tests ####",
        verbose: false,
        testTimeout: 15000,
        collectCoverage: true,
        coverageDirectory: "coverage/integrations",
        // setupFilesAfterEnv: ["<rootDir>/test/jest-setup.ts"],
        testMatch: ['<rootDir>/integrations/**/?(*.)+(spec|test).[tj]s?(x)'],
        preset: 'ts-jest',
        // Falta ajustar esse parâmetro
        collectCoverageFrom: [
            "<rootDir>/../src/**/?(*.)+(spec|test).[tj]s?(x)",
        ]
    }
}