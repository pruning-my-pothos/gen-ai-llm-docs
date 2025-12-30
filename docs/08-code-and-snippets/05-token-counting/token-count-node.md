# Token Count (Node)

Estimate tokens in Node to keep prompts within limits.

## Install
```bash
npm install @dqbd/tiktoken
```

## Code (countTokens.mjs)
```javascript
import { encoding_for_model } from "@dqbd/tiktoken";

const text = "Paste your prompt or context here.";
const enc = encoding_for_model("gpt-3.5-turbo");
const ids = enc.encode(text);
console.log("Tokens:", ids.length);
enc.free();

const limit = 2048;
if (ids.length > limit) {
  console.log("Too long: trim or summarize.");
}
```

## Run
```bash
node countTokens.mjs
```

Pick a model-specific encoding close to your target.***
