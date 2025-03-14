import {Button} from "@/components/ui/button";

export default function Keyboard({cellIndex, sendDataToParent}: any) {

    const result = [];

    for (let i = 0; i <= 2; i++) {
        for (let j = 0; j <= 2; j++) {
            const content = i * 3 + j + 1;
            result.push(<Button key={i * 3 + j} onClick={() => sendDataToParent(cellIndex, content)}> {content} </Button>)
        }
        result.push(<br key={`key_${i}`}/>);
    }
    return <>
        {result}
    </>;
}