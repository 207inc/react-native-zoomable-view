# react-native-zoomable-view

Zoomable View or Image on React Native with reanimated v2

## Installation

```sh
npm install react-native-zoomable-view
```

## Usage

```js
import ZoomableView from "react-native-zoomable-view";

// ...
  const imageUrl =
    'https://images.unsplash.com/photo-1599229526921-4f29d42b0b41?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=716&q=80';

  return (
    <ZoomableView>
      <Image style={{ width: 300, height: 300 }} source={{ uri: imageUrl }} />
    </ZoomableView>
  )
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
