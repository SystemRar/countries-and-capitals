function shuffleArrayElements(array: Array<string>) {
  return array.toSorted(() => Math.random() - 0.5);
}

export default shuffleArrayElements;
