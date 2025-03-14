
const colors = [
    "bg-red-500",
    "bg-cyan-500",
    "bg-amber-500",
    "bg-yellow-500",
    "bg-lime-500",
    "bg-green-500",
    "bg-emerald-500",
    "bg-teal-500",
    "bg-cyan-500"
]

export default class ColorClass {
    color: string;

    constructor(index: number) {
        this.color = this.#getColorByIndex(index);
    }


    getColor(): string {
        return `The color is ${this.color}`;
    }

    #getColorByIndex(index: number): string {
        const column = index % 9; //0-8
        const row = Math.trunc(index / 9); //0-8

        const colorColumn = Math.trunc(column / 3);
        const colorRow = Math.trunc(row / 3);


        return colors[colorRow * 3 + colorColumn];
    }
}