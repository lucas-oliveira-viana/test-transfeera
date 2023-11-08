import type { Config } from "jest";
import { defaults } from "jest-config";

const config: Config = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, "mts"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@core(.*)$": "<rootDir>/src/core$1",
    "^@shared(.*)$": "<rootDir>/src/shared$1",
  },
};

export default config;
