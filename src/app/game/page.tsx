import Image from "next/image";
import {Button} from "@/components/ui/button";


export default function Home() {
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
    const cells = new Array(81).fill(
        {"color": ""}
    ).map(
        (value, index) => {
            const column = index % 9; //0-8
            const row = Math.trunc(index / 9); //0-8

            const colorColumn = Math.trunc(column / 3);
            const colorRow = Math.trunc(row / 3);

            return {"color": colors[colorRow * 3 + colorColumn]};

        }
    )


    // const cells = [1,2,3];

    const result = [];

    for (let i = 0; i <= 8; i++) {

        for (let j = 0; j <= 8; j++) {
            result.push(<Button key={i * 9 + j} className={cells[i * 9 + j].color}>T</Button>)
        }
        result.push(<br/>);
    }
    return <>
        {result}
    </>;
}
