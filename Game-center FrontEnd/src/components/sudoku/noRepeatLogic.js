export default function NoRepeatLogic(num) {
    const row_1 = [0,  1,  2,  3,  4,  5,  6,  7,  8];
    const row_2 = [9, 10, 11, 12, 13, 14, 15, 16, 17];
    const row_3 = [18, 19, 20, 21, 22, 23, 24, 25, 26];
    const row_4 = [27, 28, 29, 30, 31, 32, 33, 34, 35];
    const row_5 = [36, 37, 38, 39, 40, 41, 42, 43, 44];
    const row_6 = [45, 46, 47, 48, 49, 50, 51, 52, 53];
    const row_7 = [54, 55, 56, 57, 58, 59, 60, 61, 62];
    const row_8 = [63, 64, 65, 66, 67, 68, 69, 70, 71];
    const row_9 = [72, 73, 74, 75, 76, 77, 78, 79, 80];

    const col_1 = [0,  9, 18, 27, 36, 45, 54, 63, 72];
    const col_2 = [1, 10, 19, 28, 37, 46, 55, 64, 73];
    const col_3 = [2, 11, 20, 29, 38, 47, 56, 65, 74];
    const col_4 = [3, 12, 21, 30, 39, 48, 57, 66, 75];
    const col_5 = [4, 13, 22, 31, 40, 49, 58, 67, 76];
    const col_6 = [5, 14, 23, 32, 41, 50, 59, 68, 77];
    const col_7 = [6, 15, 24, 33, 42, 51, 60, 69, 78];
    const col_8 = [7, 16, 25, 34, 43, 52, 61, 70, 79];
    const col_9 = [8, 17, 26, 35, 44, 53, 62, 71, 80];

    const block_1 = [0, 1, 2, 9, 10, 11, 18, 19, 20];
    const block_2 = [3, 4, 5, 12, 13, 14, 21, 22, 23];
    const block_3 = [6, 7, 8, 15, 16, 17, 24, 25, 26];
    const block_4 = [27, 28, 29, 36, 37, 38, 45, 46, 47];
    const block_5 = [30, 31, 32, 39, 40, 41, 48, 49, 50];
    const block_6 = [33, 34, 35, 42, 43, 44, 51, 52, 53];
    const block_7 = [54, 55, 56, 63, 64, 65, 72, 73, 74];
    const block_8 = [57, 58, 59, 66, 67, 68, 75, 76, 77];
    const block_9 = [60, 61, 62, 69, 70, 71, 78, 79, 80];

    let correctColumn = []
    let correctRow = []
    let correctBlock = []
    switch (num %9) {
        case 0:
            correctColumn = col_1
            break;
        case 1:
            correctColumn = col_2
            break;
        case 2:
            correctColumn = col_3
            break;
        case 3:
            correctColumn = col_4
            break;
        case 4:
            correctColumn = col_5
            break;
        case 5:
            correctColumn = col_6
            break;
        case 6:
            correctColumn = col_7
            break;
        case 7:
            correctColumn = col_8
            break;
        case 8:
            correctColumn = col_9
            break;
        default:
            break;
    }

    switch (Math.floor(num / 9)) {
        case 0:
            correctRow = row_1;
            break;
        case 1:
            correctRow = row_2;
            break;
        case 2:
            correctRow = row_3;
            break;
        case 3:
            correctRow = row_4;
            break;
        case 4:
            correctRow = row_5;
            break;
        case 5:
            correctRow = row_6;
            break;
        case 6:
            correctRow = row_7;
            break;
        case 7:
            correctRow = row_8;
            break;
        case 8:
            correctRow = row_9;
            break;
        default:
            break; // Handle the case if num is outside the expected range
    }

    if (block_1.includes(num)) {
        correctBlock = block_1;
    } else if (block_2.includes(num)) {
        correctBlock = block_2;
    } else if (block_3.includes(num)) {
        correctBlock = block_3;
    } else if (block_4.includes(num)) {
        correctBlock = block_4;
    } else if (block_5.includes(num)) {
        correctBlock = block_5;
    } else if (block_6.includes(num)) {
        correctBlock = block_6;
    } else if (block_7.includes(num)) {
        correctBlock = block_7;
    } else if (block_8.includes(num)) {
        correctBlock = block_8;
    } else if (block_9.includes(num)) {
        correctBlock = block_9;
    }
  return (
    [correctRow,correctColumn,correctBlock]
  )
}
