const BOARD_SIZE = 9;
const BLOCK_SIZE = 3;

export default function NoRepeatLogic(num) {
    const row = Math.floor(num / BOARD_SIZE);
    const col = num % BOARD_SIZE;
    const blockRow = Math.floor(row / BLOCK_SIZE);
    const blockCol = Math.floor(col / BLOCK_SIZE);

    const correctRow = Array.from({length: BOARD_SIZE}, (_, i) => row * BOARD_SIZE + i);
    const correctColumn = Array.from({length: BOARD_SIZE}, (_, i) => i * BOARD_SIZE + col);
    const correctBlock = Array.from({length: BOARD_SIZE}, (_, i) => {
        const r = Math.floor(i / BLOCK_SIZE);
        const c = i % BLOCK_SIZE;
        return (blockRow * BLOCK_SIZE + r) * BOARD_SIZE + (blockCol * BLOCK_SIZE + c);
    });

    return [correctRow, correctColumn, correctBlock];
}