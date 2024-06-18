import { Dispatch, SetStateAction } from "react"

export default interface DummyProps {
    colorScheme: string,
    number: number,
    setNumber: Dispatch<SetStateAction<number>>,
}