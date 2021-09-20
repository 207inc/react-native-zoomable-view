import * as React from 'react';

import { StyleSheet, Image } from 'react-native';
import { ZoomableView } from 'src/ZoomableView';

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 500,
  },
});

const imageUrl =
  'https://images.unsplash.com/photo-1599229526921-4f29d42b0b41?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=716&q=80';

export default function App() {
  return (
    <ZoomableView>
      <Image style={styles.image} source={{ uri: imageUrl }} />
    </ZoomableView>
  );
}
