### Install TypeScript compiler globally

`npm install -g typescript`

### Create a tsconfig.json file

`tsc --init`

### Configure tsconfig.json file

```
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020", // ➡️ Which JS version to compile to
    "module": "CommonJS", // ➡️ How to handle module imports/exports
    "outDir": "./dist", // ➡️ Where to put the generated .js files
    "rootDir": "./src", // ➡️ Where your original .ts files are
    "strict": true, // ➡️ Enables all strict type-checking options (RECOMMENDED!)
    "esModuleInterop": true, // ➡️ Helps with importing modules
    "skipLibCheck": true, // ➡️ Skips type-checking declaration files
    "forceConsistentCasingInFileNames": true // ➡️ Enforce case-sensitive file names
  }
}
```

### Watch Mode to automatically compile

`tsc -w`

### Install Lodash library

`npm install lodash`

### Install TypeScript type definitions for Lodash (development only)

`npm install --save-dev @types/lodash`

### Install TypeScript type definitions for Node.js (development only)

`npm install --save-dev @types/node`

### Include Node.js type definitions

```
// tsconfig.json
{
  "compilerOptions": {
    "types": ["node"]
  }
}
```

### Run JavaScript file

`node dist/tipCalculator.js`

### Configure .gitignore

```
// .gitignore
node_modules/
dist/
```
