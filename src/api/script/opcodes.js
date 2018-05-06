export default [{
  mnemonic: 'OP_0',
  value: 0,
  description: 'An empty array of bytes is pushed onto the stack.',
  category: 'Constants',
}, {
  mnemonic: 'OP_FALSE',
  value: 0,
  description: 'An empty array of bytes is pushed onto the stack.',
  category: 'Constants',
}, {
  mnemonic: 'OP_PUSHDATA1',
  value: 76,
  description: 'The next byte contains the number of bytes to be pushed onto the stack.',
  category: 'Constants',
}, {
  mnemonic: 'OP_PUSHDATA2',
  value: 77,
  description: 'The next two bytes contain the number of bytes to be pushed onto the stack in little endian order.',
  category: 'Constants',
}, {
  mnemonic: 'OP_PUSHDATA4',
  value: 78,
  description: 'The next four bytes contain the number of bytes to be pushed onto the stack in little endian order.',
  category: 'Constants',
}, {
  mnemonic: 'OP_1NEGATE',
  value: 79,
  description: 'The number -1 is pushed onto the stack.',
  category: 'Constants',
}, {
  mnemonic: 'OP_TRUE',
  value: 81,
  description: 'The number 1 is pushed onto the stack.',
  category: 'Constants',
}, {
  mnemonic: 'OP_1',
  value: 81,
  description: 'The number 1 is pushed onto the stack.',
  category: 'Constants',
}, {
  mnemonic: 'OP_2',
  value: 82,
  description: 'The number in the word name is pushed onto the stack.',
  category: 'Constants',
}, {
  mnemonic: 'OP_3',
  value: 83,
  description: 'The number in the word name is pushed onto the stack.',
  category: 'Constants',
}, {
  mnemonic: 'OP_4',
  value: 84,
  description: 'The number in the word name is pushed onto the stack.',
  category: 'Constants',
}, {
  mnemonic: 'OP_5',
  value: 85,
  description: 'The number in the word name is pushed onto the stack.',
  category: 'Constants',
}, {
  mnemonic: 'OP_6',
  value: 86,
  description: 'The number in the word name is pushed onto the stack.',
  category: 'Constants',
}, {
  mnemonic: 'OP_7',
  value: 87,
  description: 'The number in the word name is pushed onto the stack.',
  category: 'Constants',
}, {
  mnemonic: 'OP_8',
  value: 88,
  description: 'The number in the word name is pushed onto the stack.',
  category: 'Constants',
}, {
  mnemonic: 'OP_9',
  value: 89,
  description: 'The number in the word name is pushed onto the stack.',
  category: 'Constants',
}, {
  mnemonic: 'OP_10',
  value: 90,
  description: 'The number in the word name is pushed onto the stack.',
  category: 'Constants',
}, {
  mnemonic: 'OP_11',
  value: 91,
  description: 'The number in the word name is pushed onto the stack.',
  category: 'Constants',
}, {
  mnemonic: 'OP_12',
  value: 92,
  description: 'The number in the word name is pushed onto the stack.',
  category: 'Constants',
}, {
  mnemonic: 'OP_13',
  value: 93,
  description: 'The number in the word name is pushed onto the stack.',
  category: 'Constants',
}, {
  mnemonic: 'OP_14',
  value: 94,
  description: 'The number in the word name is pushed onto the stack.',
  category: 'Constants',
}, {
  mnemonic: 'OP_15',
  value: 95,
  description: 'The number in the word name is pushed onto the stack.',
  category: 'Constants',
}, {
  mnemonic: 'OP_16',
  value: 96,
  description: 'The number in the word name is pushed onto the stack.',
  category: 'Constants',
}, {
  mnemoic: 'OP_NOP',
  opcode: 97,
  description: 'Does nothing.',
  category: 'Flow control',
}, {
  mnemoic: 'OP_IF',
  opcode: 99,
  description: 'If the top stack value is not False, the statements are executed. The top stack value is removed.',
  category: 'Flow control',
}, {
  mnemoic: 'OP_NOTIF',
  opcode: 100,
  description: 'If the top stack value is False, the statements are executed. The top stack value is removed.',
  category: 'Flow control',
}, {
  mnemoic: 'OP_ELSE',
  opcode: 103,
  description: 'If the preceding OP_IF or OP_NOTIF or OP_ELSE was not executed then these statements are and if the preceding OP_IF or OP_NOTIF or OP_ELSE was executed then these statements are not.',
  category: 'Flow control',
}, {
  mnemoic: 'OP_ENDIF',
  opcode: 104,
  description: 'Ends an if/else block.',
  category: 'Flow control',
}, {
  mnemoic: 'OP_VERIFY',
  opcode: 105,
  description: 'Marks transaction as invalid if top stack value is not true. The top stack value is removed.',
  category: 'Flow control',
}, {
  mnemoic: 'OP_RETURN',
  opcode: 106,
  description: 'Marks transaction as invalid. A standard way of attaching extra data to transactions is to add a zero-value output with a scriptPubKey consisting of OP_RETURN followed by exactly one pushdata op. Such outputs are provably unspendable, reducing their cost to the network. Currently it is usually considered non-standard (though valid) for a transaction to have more than one OP_RETURN output or an OP_RETURN output with more than one pushdata op.',
  category: 'Flow control',
}, {
  mnemoic: 'OP_TOALTSTACK',
  opcode: 107,
  description: 'Puts the input onto the top of the alt stack. Removes it from the main stack.',
  category: 'Stack',
}, {
  mnemoic: 'OP_FROMALTSTACK',
  opcode: 108,
  description: 'Puts the input onto the top of the main stack. Removes it from the alt stack.',
  category: 'Stack',
}, {
  mnemoic: 'OP_IFDUP',
  opcode: 115,
  description: 'If the top stack value is not 0, duplicate it.',
  category: 'Stack',
}, {
  mnemoic: 'OP_DEPTH',
  opcode: 116,
  description: 'Puts the number of stack items onto the stack.',
  category: 'Stack',
}, {
  mnemoic: 'OP_DROP',
  opcode: 117,
  description: 'Removes the top stack item.',
  category: 'Stack',
}, {
  mnemoic: 'OP_DUP',
  opcode: 118,
  description: 'Duplicates the top stack item.',
  category: 'Stack',
}, {
  mnemoic: 'OP_NIP',
  opcode: 119,
  description: 'Removes the second-to-top stack item.',
  category: 'Stack',
}, {
  mnemoic: 'OP_OVER',
  opcode: 120,
  description: 'Copies the second-to-top stack item to the top.',
  category: 'Stack',
}, {
  mnemoic: 'OP_PICK',
  opcode: 121,
  description: 'The item n back in the stack is copied to the top.',
  category: 'Stack',
}, {
  mnemoic: 'OP_ROLL',
  opcode: 122,
  description: 'The item n back in the stack is moved to the top.',
  category: 'Stack',
}, {
  mnemoic: 'OP_ROT',
  opcode: 123,
  description: 'The top three items on the stack are rotated to the left.',
  category: 'Stack',
}, {
  mnemoic: 'OP_SWAP',
  opcode: 124,
  description: 'The top two items on the stack are swapped.',
  category: 'Stack',
}, {
  mnemoic: 'OP_TUCK',
  opcode: 125,
  description: 'The item at the top of the stack is copied and inserted before the second-to-top item.',
  category: 'Stack',
}, {
  mnemoic: 'OP_2DROP',
  opcode: 109,
  description: 'Removes the top two stack items.',
  category: 'Stack',
}, {
  mnemoic: 'OP_2DUP',
  opcode: 110,
  description: 'Duplicates the top two stack items.',
  category: 'Stack',
}, {
  mnemoic: 'OP_3DUP',
  opcode: 111,
  description: 'Duplicates the top three stack items.',
  category: 'Stack',
}, {
  mnemoic: 'OP_2OVER',
  opcode: 112,
  description: 'Copies the pair of items two spaces back in the stack to the front.',
  category: 'Stack',
}, {
  mnemoic: 'OP_2ROT',
  opcode: 113,
  description: 'The fifth and sixth items back are moved to the top of the stack.',
  category: 'Stack',
}, {
  mnemoic: 'OP_2SWAP',
  opcode: 114,
  description: 'Swaps the top two pairs of items.',
  category: 'Stack',
}, {
  mnemoic: 'OP_CAT',
  opcode: 126,
  description: 'Concatenates two byte sequences. Will be re-enabled in the Monolith upgrade, May 15th 2018.',
  category: 'Splice',
}, {
  mnemoic: 'OP_SPLIT',
  opcode: 127,
  description: 'Split byte sequence in at position n. Will be re-enabled in the Monolith upgrade, May 15th 2018, replaces the previously disabled OP_SUBSTR.',
  category: 'Splice',
}, {
  mnemoic: 'OP_SIZE',
  opcode: 130,
  description: 'Pushes the string length of the top element of the stack (without popping it).',
  category: 'Splice',
}, {
  mnemoic: 'OP_INVERT',
  opcode: 131,
  description: 'Flips all of the bits in the input. disabled.',
  category: 'Bitwise logic',
}, {
  mnemoic: 'OP_AND',
  opcode: 132,
  description: 'Boolean and between each bit in the inputs. Will be re-enabled in the Monolith upgrade, May 15th 2018.',
  category: 'Bitwise logic',
}, {
  mnemoic: 'OP_OR',
  opcode: 133,
  description: 'Boolean or between each bit in the inputs. Will be re-enabled in the Monolith upgrade, May 15th 2018.',
  category: 'Bitwise logic',
}, {
  mnemoic: 'OP_XOR',
  opcode: 134,
  description: 'Boolean exclusive or between each bit in the inputs. Will be re-enabled in the Monolith upgrade, May 15th 2018.',
  category: 'Bitwise logic',
}, {
  mnemoic: 'OP_EQUAL',
  opcode: 135,
  description: 'Returns 1 if the inputs are exactly equal, 0 otherwise.',
  category: 'Bitwise logic',
}, {
  mnemoic: 'OP_EQUALVERIFY',
  opcode: 136,
  description: 'Same as OP_EQUAL, but runs OP_VERIFY afterward.',
  category: 'Bitwise logic',
}, {
  mnemoic: 'OP_1ADD',
  opcode: 139,
  description: '1 is added to the input.',
  category: 'Arithmetic',
}, {
  mnemoic: 'OP_1SUB',
  opcode: 140,
  description: '1 is subtracted from the input.',
  category: 'Arithmetic',
}, {
  mnemoic: 'OP_2MUL',
  opcode: 141,
  description: 'The input is multiplied by 2. disabled.',
  category: 'Arithmetic',
}, {
  mnemoic: 'OP_2DIV',
  opcode: 142,
  description: 'The input is divided by 2. disabled.',
  category: 'Arithmetic',
}, {
  mnemoic: 'OP_NEGATE',
  opcode: 143,
  description: 'The sign of the input is flipped.',
  category: 'Arithmetic',
}, {
  mnemoic: 'OP_ABS',
  opcode: 144,
  description: 'The input is made positive.',
  category: 'Arithmetic',
}, {
  mnemoic: 'OP_NOT',
  opcode: 145,
  description: 'If the input is 0 or 1, it is flipped. Otherwise the output will be 0.',
  category: 'Arithmetic',
}, {
  mnemoic: 'OP_0NOTEQUAL',
  opcode: 146,
  description: 'Returns 0 if the input is 0. 1 otherwise.',
  category: 'Arithmetic',
}, {
  mnemoic: 'OP_ADD',
  opcode: 147,
  description: 'a is added to b.',
  category: 'Arithmetic',
}, {
  mnemoic: 'OP_SUB',
  opcode: 148,
  description: 'b is subtracted from a.',
  category: 'Arithmetic',
}, {
  mnemoic: 'OP_MUL',
  opcode: 149,
  description: 'a is multiplied by b. disabled.',
  category: 'Arithmetic',
}, {
  mnemoic: 'OP_DIV',
  opcode: 150,
  description: 'a is divided by b. Will be re-enabled in the Monolith upgrade, May 15th 2018.',
  category: 'Arithmetic',
}, {
  mnemoic: 'OP_MOD',
  opcode: 151,
  description: 'Returns the remainder after dividing a by b. Will be re-enabled in the Monolith upgrade, May 15th 2018.',
  category: 'Arithmetic',
}, {
  mnemoic: 'OP_LSHIFT',
  opcode: 152,
  description: 'Shifts a left b bits, preserving sign. disabled.',
  category: 'Arithmetic',
}, {
  mnemoic: 'OP_RSHIFT',
  opcode: 153,
  description: 'Shifts a right b bits, preserving sign. disabled.',
  category: 'Arithmetic',
}, {
  mnemoic: 'OP_BOOLAND',
  opcode: 154,
  description: 'If both a and b are not "" (null string), the output is 1. Otherwise 0.',
  category: 'Arithmetic',
}, {
  mnemoic: 'OP_BOOLOR',
  opcode: 155,
  description: 'If a or b is not "" (null string), the output is 1. Otherwise 0.',
  category: 'Arithmetic',
}, {
  mnemoic: 'OP_NUMEQUAL',
  opcode: 156,
  description: 'Returns 1 if the numbers are equal, 0 otherwise.',
  category: 'Arithmetic',
}, {
  mnemoic: 'OP_NUMEQUALVERIFY',
  opcode: 157,
  description: 'Same as OP_NUMEQUAL, but runs OP_VERIFY afterward.',
  category: 'Arithmetic',
}, {
  mnemoic: 'OP_NUMNOTEQUAL',
  opcode: 158,
  description: 'Returns 1 if the numbers are not equal, 0 otherwise.',
  category: 'Arithmetic',
}, {
  mnemoic: 'OP_LESSTHAN',
  opcode: 159,
  description: 'Returns 1 if a is less than b, 0 otherwise.',
  category: 'Arithmetic',
}, {
  mnemoic: 'OP_GREATERTHAN',
  opcode: 160,
  description: 'Returns 1 if a is greater than b, 0 otherwise.',
  category: 'Arithmetic',
}, {
  mnemoic: 'OP_LESSTHANOREQUAL',
  opcode: 161,
  description: 'Returns 1 if a is less than or equal to b, 0 otherwise.',
  category: 'Arithmetic',
}, {
  mnemoic: 'OP_GREATERTHANOREQUAL',
  opcode: 162,
  description: 'Returns 1 if a is greater than or equal to b, 0 otherwise.',
  category: 'Arithmetic',
}, {
  mnemoic: 'OP_MIN',
  opcode: 163,
  description: 'Returns the smaller of a and b.',
  category: 'Arithmetic',
}, {
  mnemoic: 'OP_MAX',
  opcode: 164,
  description: 'Returns the larger of a and b.',
  category: 'Arithmetic',
}, {
  mnemoic: 'OP_WITHIN',
  opcode: 165,
  description: 'Returns 1 if x is within the specified range (left-inclusive), 0 otherwise.',
  category: 'Arithmetic',
}, {
  mnemoic: 'OP_NUM2BIN',
  opcode: 128,
  description: 'convert numeric value a into byte sequence of length b. New opcode added in the Monolith upgrade, May 15th 2018.',
  category: 'Arithmetic',
}, {
  mnemoic: 'OP_BIN2NUM',
  opcode: 129,
  description: 'convert byte sequence x into a numeric value. New opcode added in the Monolith upgrade, May 15th 2018.',
  category: 'Arithmetic',
}, {
  mnemoic: 'OP_RIPEMD160',
  opcode: 166,
  description: 'The input is hashed using RIPEMD-160.',
  category: 'Crypto',
}, {
  mnemoic: 'OP_SHA1',
  opcode: 167,
  description: 'The input is hashed using SHA-1.',
  category: 'Crypto',
}, {
  mnemoic: 'OP_SHA256',
  opcode: 168,
  description: 'The input is hashed using SHA-256.',
  category: 'Crypto',
}, {
  mnemoic: 'OP_HASH160',
  opcode: 169,
  description: 'The input is hashed twice: first with SHA-256 and then with RIPEMD-160.',
  category: 'Crypto',
}, {
  mnemoic: 'OP_HASH256',
  opcode: 170,
  description: 'The input is hashed two times with SHA-256.',
  category: 'Crypto',
}, {
  mnemoic: 'OP_CODESEPARATOR',
  opcode: 171,
  description: 'All of the signature checking words will only match signatures to the data after the most recently-executed OP_CODESEPARATOR.',
  category: 'Crypto',
}, {
  mnemoic: 'OP_CHECKSIG',
  opcode: 172,
  description: "The entire transaction's outputs, inputs, and script (from the most recently-executed OP_CODESEPARATOR to the end) are hashed.",
  category: 'Crypto',
}, {
  mnemoic: 'OP_CHECKSIGVERIFY',
  opcode: 173,
  description: 'Same as OP_CHECKSIG, but OP_VERIFY is executed afterward.',
  category: 'Crypto',
}, {
  mnemoic: 'OP_CHECKMULTISIG',
  opcode: 174,
  description: 'Compares the first signature against each public key until it finds an ECDSA match.',
  category: 'Crypto',
}, {
  mnemoic: 'OP_CHECKMULTISIGVERIFY',
  opcode: 175,
  description: 'Same as OP_CHECKMULTISIG, but OP_VERIFY is executed afterward.',
  category: 'Crypto',
}, {
  mnemoic: 'OP_CHECKLOCKTIMEVERIFY (previously OP_NOP2)',
  opcode: 177,
  description: "Marks transaction as invalid if the top stack item is greater than the transaction's nLockTime field. See BIP 0065.",
  category: 'Locktime',
}, {
  mnemoic: 'OP_CHECKSEQUENCEVERIFY (previously OP_NOP3)',
  opcode: 178,
  description: 'Marks transaction as invalid if the relative lock time of the input (enforced by BIP 0068 with nSequence) is not equal to or longer than the value of the top stack item. The precise semantics are described in BIP 0112.',
  category: 'Locktime',
}, {
  mnemoic: 'OP_PUBKEYHASH',
  opcode: 253,
  description: 'Represents a public key hashed with OP_HASH160.',
  category: 'Pseudo-words',
}, {
  mnemoic: 'OP_PUBKEY',
  opcode: 254,
  description: 'Represents a public key compatible with OP_CHECKSIG.',
  category: 'Pseudo-words',
}, {
  mnemoic: 'OP_INVALIDOPCODE',
  opcode: 255,
  description: 'Matches any opcode that is not yet assigned.',
  category: 'Pseudo-words',
}, {
  mnemoic: 'OP_RESERVED',
  opcode: 80,
  description: 'Transaction is invalid unless occuring in an unexecuted OP_IF branch',
  category: 'Reserved words',
}, {
  mnemoic: 'OP_VER',
  opcode: 98,
  description: 'Transaction is invalid unless occuring in an unexecuted OP_IF branch',
  category: 'Reserved words',
}, {
  mnemoic: 'OP_VERIF',
  opcode: 101,
  description: 'Transaction is invalid even when occuring in an unexecuted OP_IF branch',
  category: 'Reserved words',
}, {
  mnemoic: 'OP_VERNOTIF',
  opcode: 102,
  description: 'Transaction is invalid even when occuring in an unexecuted OP_IF branch',
  category: 'Reserved words',
}, {
  mnemoic: 'OP_RESERVED1',
  opcode: 137,
  description: 'Transaction is invalid unless occuring in an unexecuted OP_IF branch',
  category: 'Reserved words',
}, {
  mnemoic: 'OP_RESERVED2',
  opcode: 138,
  description: 'Transaction is invalid unless occuring in an unexecuted OP_IF branch',
  category: 'Reserved words',
}, {
  mnemoic: 'OP_NOP1',
  opcode: 176,
  description: 'The word is ignored. Does not mark transaction as invalid.',
  category: 'Reserved words',
}, {
  mnemoic: 'OP_NOP4',
  opcode: 179,
  description: 'The word is ignored. Does not mark transaction as invalid.',
  category: 'Reserved words',
}, {
  mnemoic: 'OP_NOP5',
  opcode: 180,
  description: 'The word is ignored. Does not mark transaction as invalid.',
  category: 'Reserved words',
}, {
  mnemoic: 'OP_NOP6',
  opcode: 181,
  description: 'The word is ignored. Does not mark transaction as invalid.',
  category: 'Reserved words',
}, {
  mnemoic: 'OP_NOP7',
  opcode: 182,
  description: 'The word is ignored. Does not mark transaction as invalid.',
  category: 'Reserved words',
}, {
  mnemoic: 'OP_NOP8',
  opcode: 183,
  description: 'The word is ignored. Does not mark transaction as invalid.',
  category: 'Reserved words',
}, {
  mnemoic: 'OP_NOP9',
  opcode: 184,
  description: 'The word is ignored. Does not mark transaction as invalid.',
  category: 'Reserved words',
}, {
  mnemoic: 'OP_NOP10',
  opcode: 185,
  description: 'The word is ignored. Does not mark transaction as invalid.',
  category: 'Reserved words',
}];
