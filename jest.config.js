module.exports = {
  "resetMocks": true,
  "coverageReporters": ["json", "html"],
  "moduleNameMapper": {
    "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules",
    "^public/(.*)$": "<rootDir>/public/$1",
    "^components/(.*)$": "<rootDir>/components/$1",
    "^contexts/(.*)$": "<rootDir>/contexts/$1",
    "^styles/(.*)$": "<rootDir>/styles/$1",
    "^configs/(.*)$": "<rootDir>/configs/$1",
    "^constants/(.*)$": "<rootDir>/constants/$1",
    "^utils/(.*)$": "<rootDir>/utils/$1"
  }
};
