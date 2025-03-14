"use client";
import {Button} from "@/components/ui/button";
import Cell from "@/components/game/Cell";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import Keyboard from "@/components/game/Keyboard";
import {useState} from "react";



export default function Home() {

    const [cells, setCells] = useState(new Array(81).fill(0).map(
        (_: any, index) => {
            return new Cell(index);
        }
    ))



    const onKeyPressed = ( index: number, data: number) => {

        const newCells = Object.assign({}, cells) ;
        newCells[index].setNumber(data);

        console.log("called on key pressed", index, data);
        setCells(newCells);
    };



    const result = [];

    for (let i = 0; i <= 8; i++) {

        for (let j = 0; j <= 8; j++) {
            const index = i * 9 + j;
            result.push(<Button key={index} className={cells[index].getColor()}>
                <Popover>
                    <PopoverTrigger>{cells[index].value ?? "_"}</PopoverTrigger>
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
    </>;
}
