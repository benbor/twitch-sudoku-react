"use client";
import {Button} from "@/components/ui/button";
import {Cell} from "@/lib/cell";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import Keyboard from "@/components/game/Keyboard";
import {useState} from "react";
import {initValues} from "@/lib/game/GameInitor";
import {black} from "next/dist/lib/picocolors";

const initMap = () => {
    return initValues().map(
        (value, index) => {
            return new Cell(index, value);
        }
    )
}


export default function Home() {


    const [cells, setCells] = useState(initMap());

    const resetState = () => {
        setCells(initMap());
    }

    const validateCell = (index: number, cells: Cell[]) => {
        const currentCell = cells[index];
        const nears = currentCell.returnNearestIndexes();


        const filterRes = nears.filter((index) => {
            return cells[index].value == currentCell.value
        })

        const isValid = filterRes.length == 0;

        currentCell.valid = isValid;
    }

    const onKeyPressed = (index: number, data: number) => {
        const newCells = Object.assign({}, cells);
        newCells[index].setNumber(data);

        validateCell(index, newCells);

        setCells(newCells);
    };


    const result = [];

    for (let i = 0; i <= 8; i++) {

        for (let j = 0; j <= 8; j++) {
            const index = i * 9 + j;
            result.push(<Button key={index} className={cells[index].getColor()}>
                <Popover>
                    <PopoverTrigger className={"text-black"}>{cells[index].value ?? "_"}</PopoverTrigger>
                    <PopoverContent>
                        <Keyboard cellIndex={index} sendDataToParent={onKeyPressed}></Keyboard>
                    </PopoverContent>
                </Popover>
            </Button>)
        }
        result.push(<br key={`key_${i}`}/>);
    }
    return <>
        {result}
    <Button key={"restart"} onClick={()=>{resetState()}}> RESTART!! </Button>

    </>;
}
