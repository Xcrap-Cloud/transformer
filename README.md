Here's the document translated into English:

-----

# 🕷️ Xcrap Transformer

**Xcrap Transformer** is the data transformation package for data extracted from the **Xcrap** Web Scraping framework.

## 📦 Installation

Installation is straightforward. Use your preferred dependency manager. Here's an example of how you'd install it using NPM:

```bash
npm i @xcrap/transformer
```

## 🚀 Usage

Usage is similar to `@xcrap/parser`; we use declarative models to transform data. See an example below:

```ts
import {
    StringTransformer,
    StringValidator,
    AnyValidator,
    Transformer,
    TransformingModel,
    transform
} from "./src"

const rawData = [
    {
        id: "1",
        name_: "Marcuth ",
        avatar_url: "/assets/users/1/avatar.png"
    },
    {
        id: "2,0",
        name_: "JavaScript  User ",
        avatar_url: "/assets/users/2/avatar.png"
    },
    {
        id: 3,
        name_: "Pedro",
        avatar_url: "/assets/users/3/avatar.png"
    },
]

const transformingModel = new TransformingModel({
    id: [ // return key
        transform({
            key: "id",  // at index 0 always raw data key
            condition: (value) => AnyValidator.isString(value) && value.includes(","),
            transformer: StringTransformer.replace(",", ".")
        }),
        transform({
            key: "id", // transformed data key
            condition: StringValidator.isNumeric,
            transformer: StringTransformer.toNumber
        })
    ],
    name: [ // return key
        transform({
            key: "name_", // at index 0 always raw data key
            transformer: StringTransformer.collapseWhitespace
        })
    ],
    avatarUrl: [ // return key
        transform({
            key: "avatar_url", // at index 0 always raw data key
            transformer: StringTransformer.resolveUrl("https://baseurl.com/")
        })
    ]
}).after({
    append: {
        role: "USER"
    },
    delete: [
        "name_",
        "avatar_url"
    ]
})

const transformer = new Transformer(rawData)

;(async () => {
    const transformedData = await transformer.transform(transformingModel)
    console.log(transformedData)
})();

```

**Expected output**:

```js
[
  {
    id: 1,
    name: 'Marcuth',
    avatarUrl: 'https://baseurl.com/assets/users/1/avatar.png',
    role: 'USER'
  },
  {
    id: 2,
    name: 'JavaScript User',
    avatarUrl: 'https://baseurl.com/assets/users/2/avatar.png',
    role: 'USER'
  },
  {
    id: 3,
    name: 'Pedro',
    avatarUrl: 'https://baseurl.com/assets/users/3/avatar.png',
    role: 'USER'
  }
]
```

## 🧪 Tests

Automated tests are located in `__tests__`. To run them:

```bash
npm run test
```

## 🤝 Contributing

  - Want to contribute? Follow these steps:
  - Fork the repository.
  - Create a new branch (git checkout -b feature-new).
  - Commit your changes (git commit -m 'Add new feature').
  - Push to the branch (git push origin feature-new).
  - Open a Pull Request.

## 📝 License

This project is licensed under the MIT License.