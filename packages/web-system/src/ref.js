const ref = {
  app: {},
  loadedBlocks: {},
  blocks: {},

  registerBlock(identity, loader) {
    this.blocks[identity] = loader;
  },
};

// ref.registerBlock('aaa', () => {});

// console.log(ref.blocks);
export default ref;
