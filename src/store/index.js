import Vuex from 'vuex';

const createStore = () => new Vuex.Store({
  state: {
    blocks: [
      {
        height: 32372,
        interval: 909,
        hash: '0000000095db25d780b28257d6acb35aa45dd9a7a220832f9f19bd707a852cad',
        size: 216,
        time: 1262230266,
        tx_count: 1,
        previousblockhash: '000000005c671532fd35bd895f461cd7fb72afbc28155a1e52ad2562cb36b6ed',
        nextblockhash: '000000005c981f86efe470feb0097f55abaa3c6868b2a536069fbfbf20ed4840',
      },
      {
        height: 32371,
        interval: 457,
        hash: '000000005c671532fd35bd895f461cd7fb72afbc28155a1e52ad2562cb36b6ed',
        size: 215,
        time: 1262229357,
        tx_count: 1,
        previousblockhash: '0000000030920e100d73c6b9aa6a956203adafb619a3fa884540cbb6524befcc',
        nextblockhash: '0000000095db25d780b28257d6acb35aa45dd9a7a220832f9f19bd707a852cad',
      },
      {
        height: 32370,
        interval: 346,
        hash: '0000000030920e100d73c6b9aa6a956203adafb619a3fa884540cbb6524befcc',
        size: 216,
        time: 1262228900,
        tx_count: 1,
        previousblockhash: '000000000362b0f1e035d379189c2666b1bb1a7cfd0168da22d022d9d763d469',
        nextblockhash: '000000005c671532fd35bd895f461cd7fb72afbc28155a1e52ad2562cb36b6ed',
      },
      {
        height: 32369,
        interval: 342,
        hash: '000000000362b0f1e035d379189c2666b1bb1a7cfd0168da22d022d9d763d469',
        size: 215,
        time: 1262228554,
        tx_count: 1,
        previousblockhash: '000000008e42ee1c9c6bda79dce67c4c247a23c19a5fa4b389f584ba8661efbb',
        nextblockhash: '0000000030920e100d73c6b9aa6a956203adafb619a3fa884540cbb6524befcc',
      },
      {
        height: 32368,
        interval: 887,
        hash: '000000008e42ee1c9c6bda79dce67c4c247a23c19a5fa4b389f584ba8661efbb',
        size: 216,
        time: 1262228212,
        tx_count: 1,
        previousblockhash: '000000000e61f72ab77c1b495b54039f7957ec552d3499fcb32c681529a54f51',
        nextblockhash: '000000000362b0f1e035d379189c2666b1bb1a7cfd0168da22d022d9d763d469',
      },
    ],
  },
});

export default createStore;
