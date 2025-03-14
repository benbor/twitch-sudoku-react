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

export default class ColorClass {
    color: string;
    value?: number;
    index: number;
    valid: boolean;

    constructor(index: number) {
        this.color = ColorClass.#getColorByIndex(index);
        this.index = index;
        this.valid = true;
    }


    getColor(): string {
        if (this.valid) {
            return this.color;
        } else {
            return Error.INVALID;
        }

    }

    static #getColorByIndex(index: number): string {
        const column = index % 9; //0-8
        const row = Math.trunc(index / 9); //0-8

        const colorColumn = Math.trunc(column / 3);
        const colorRow = Math.trunc(row / 3);


        return colors[colorRow * 3 + colorColumn];
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

        result.delete(this.index);

        return [...result.values()];
    }

    setNumber(data?: number) {
        this.value = data;
    }
}