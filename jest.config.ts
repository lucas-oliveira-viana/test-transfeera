import type { Config } from "jest";
import { defaults } from "jest-config";

const config: Config = {
  verbose: true,
  moduleFileExtensions: [...defaults.moduleFileExtensions, "mts"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    '\\.(svg|png|jpg|jpeg|scss)$': '<rootDir>/src/core/test/mocks/jestFileMock.tsx',
    "^@shared(.*)$": "<rootDir>/src/shared$1",
    "^@core(.*)$": "<rootDir>/src/core$1",
  },
};

export default config;
