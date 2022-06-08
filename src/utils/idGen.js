function* idGen() {
  let id = 0;
  while (true) {
    yield `c${id++}`;
  }
}

const iterator = idGen();

export default iterator;
