/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}], // Ensure the regex is escaped properly
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Map @/ to the src/ directory
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"], // Ensure Jest recognizes TypeScript files
};
