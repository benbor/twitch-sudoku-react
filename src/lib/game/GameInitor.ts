class BlockCoord {
    public x: number;
    public y: number;

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public getRowIndex(rawN: number): number[] {
        const firstItem = 9 * (this.y * 3 + rawN) + this.x * 3;

        return [firstItem, firstItem + 1, firstItem + 2];
    }

    public getColumnIndex(columnN: number) {
        const firstItem = 9 * this.y * 3 + this.x * 3 + columnN;

        return [firstItem, firstItem + 9, firstItem + 18];
    }
}


class Field {
    private cellValues = new Array(81).fill(2);

    public constructor() {
        this.generateFirstSquare();
        this.shiftColumnsRight(new BlockCoord(0, 0), new BlockCoord(0, 1));
        this.shiftColumnsRight(new BlockCoord(0, 1), new BlockCoord(0, 2));


        for (let y = 0; y < 3; y++) {
            for (let x = 1; x < 3; x++) {
                this.shiftRowsDown(new BlockCoord(x - 1, y), new BlockCoord(x, y));
            }
        }

    }

    public getValues() {
        return this.cellValues;
    }

    public indexByCoordinate(x: number, y: number) {
        return y * 9 + x;
    }

    private generateFirstSquare() {
        let i = 1;
        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                this.cellValues[this.indexByCoordinate(x, y)] = i++;
            }
        }
    }

    private shiftRowsDown(from: BlockCoord, to: BlockCoord) {
        for (let i = 0; i < 3; i++) {
            const fromRow = from.getRowIndex(i % 3);
            const toRow = to.getRowIndex((i + 1) % 3);

            this.copyByIndex(fromRow, toRow);
        }
    }


    private copyByIndex(input: number[], out: number[]) {
        if (input.length != out.length) {
            throw new Error(`Two list is not the same size ${input.toString()}, ${out.toString()}`);
        }

        for (let i = 0; i < input.length; i++) {
            this.cellValues[out[i]] = this.cellValues[input[i]];
        }

    }

    private shiftColumnsRight(from: BlockCoord, to: BlockCoord) {
        for (let i = 0; i < 3; i++) {
            const fromColumn = from.getColumnIndex(i % 3);
            const toColumn = to.getColumnIndex((i + 1) % 3);

            this.copyByIndex(fromColumn, toColumn);
        }
    }
}


// getAllIdsOfSquare: (column: number, row: number) => {
//     const squareColumn = Math.trunc(column / 3);
//     const squareRow = Math.trunc(row / 3);
//
//     const columnOffset = squareColumn * 3;
//     const rawOffset = squareRow * 3 * 9;
//
//     const finalFirstIndex = rawOffset + columnOffset;
//
//     let result = new Set<number>;
//     for (let x = finalFirstIndex; x < finalFirstIndex + 3; x++) {
//         for (let y = x; y < x + 27; y += 9) {
//             result.add(y);
//         }
//     }
//
//     return result.values()
// }


function initValues(): number[] {
    const field = new Field();

    // field.generateFirstSquare();

    return field.getValues();
}

export {initValues}