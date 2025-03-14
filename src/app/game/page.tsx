import {Button} from "@/components/ui/button";
import Cell from "@/components/game/Cell";


export default function Home() {

    const cells = new Array(81).fill(0).map(
        (_: any, index) => {
            return new Cell(index);
        }
    )


    const result = [];

    for (let i = 0; i <= 8; i++) {

        for (let j = 0; j <= 8; j++) {
            result.push(<Button key={i * 9 + j} className={cells[i * 9 + j].getColor()}>T</Button>)
        }
        result.push(<br key={`key_${i}`}/>);
    }
    return <>
        {result}
    </>;
}
