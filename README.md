Welcome to ChangeApp - Be the change you want to see in the world!

This solution has two versions: the `ui_app` and the `node_api`

# ui_app

This is a fully client-side React + Next.js app. It calculates the change due for a given purchase, and optionally stores a list of past purchases.

The app is powered by the `wind-of-change` library for making change.

## Starting the dev server

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to open the app.

To build, run 
```
npm run build
```

# node_api

This is a simple express-based node.js HTTP API wrapper around the `wind-of-change` library for making change for a given amount

## Starting the server

To start the API server, run
```
npm run start
```

## Usage

It supports a single request that returns the denominations and quantities of change required for a given amount:

`GET /purchases/14.73`

The response looks like:

```json
200 OK
Content-Type: application/json


[
    {
        "count": 1,
        "denomination": {
            "value_usd": 10,
            "type": "bill"
        }
    },
    {
        "count": 4,
        "denomination": {
            "value_usd": 1,
            "type": "bill"
        }
    },
    {
        "count": 2,
        "denomination": {
            "value_usd": 0.25,
            "type": "coin"
        }
    },
    {
        "count": 2,
        "denomination": {
            "value_usd": 0.1,
            "type": "coin"
        }
    },
    {
        "count": 3,
        "denomination": {
            "value_usd": 0.01,
            "type": "coin"
        }
    }
]
```

# wind-of-change

This is an ES6 module-style JavaScript/TypeScript library for returning the bills and notes for a given amount.

## Usage

```js
import {make_change} from "wind-of-change"

const change = make_change(14.73)
```

`change` now looks like:

```json
[
    {
        "count": 1,
        "denomination": {
            "value_usd": 10,
            "type": "bill"
        }
    },
    {
        "count": 4,
        "denomination": {
            "value_usd": 1,
            "type": "bill"
        }
    },
    {
        "count": 2,
        "denomination": {
            "value_usd": 0.25,
            "type": "coin"
        }
    },
    {
        "count": 2,
        "denomination": {
            "value_usd": 0.1,
            "type": "coin"
        }
    },
    {
        "count": 3,
        "denomination": {
            "value_usd": 0.01,
            "type": "coin"
        }
    }
]
```

## Configuration
The bill and coin denominations are configured in `src/denominations.ts` in the format:
```js
    {value_usd: 1, type: 'bill'}
```

