const colors = [
    "bg-red-200",
    "bg-cyan-200",
    "bg-amber-200",
    "bg-yellow-200",
    "bg-lime-200",
    "bg-green-200",
    "bg-emerald-200",
    "bg-teal-200",
    "bg-cyan-200"
]

enum Error {
    INVALID = "bg-red-900",
}

// @refresh reset
export class Cell {
    color: string;
    value?: number;
    index: number;
    valid: boolean;

    constructor(index: number, initValue?: number) {
        this.color = Cell.getColorByIndex(index);
        this.index = index;
        this.value = initValue;
        this.valid = true;
    }


    getColor(): string {
        if (this.valid) {
            return this.color;
        } else {
            return Error.INVALID;
        }

    }

    private static getColorByIndex(index: number): string {
        return colors[this.getSquareIndex(index)];
    }


    private static getSquareIndex(index: number) {

        const column = index % 9; //0-8
        const row = Math.trunc(index / 9); //0-8

        const colorColumn = Math.trunc(column / 3);
        const colorRow = Math.trunc(row / 3);

        return  colorRow * 3 + colorColumn;
    }

    returnNearestIndexes(): number[] {
        const column = this.index % 9; //0-8
        const row = Math.trunc(this.index / 9); //0-8

        const result = new Set<number>();
        for (let i = row * 9; i <= row * 9 + 8; i++) {
            result.add(i);

        }
        for (let i = column; i < 81 ; i = i + 9) {
            result.add(i);
        }
        this.addSquareNearestIndexes(column, row, result);

        result.delete(this.index);

        return [...result.values()];
    }

    private addSquareNearestIndexes(column: number, row: number, result: Set<number>) {
        const squareColumn = Math.trunc(column / 3);
        const squareRow = Math.trunc(row / 3);

        const columnOffset = squareColumn * 3;
        const rawOffset = squareRow * 3 * 9;

        const finalFirstIndex = rawOffset + columnOffset;

         console.log(finalFirstIndex);
        for (let x = finalFirstIndex; x < finalFirstIndex + 3; x++) {
            for (let y = x; y < x + 27; y += 9) {
                result.add(y);
            }
        }
    }

    setNumber(data?: number) {
        this.value = data;
    }
}