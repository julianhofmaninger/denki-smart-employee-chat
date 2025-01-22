import { KeyboardEvent } from "react"

export function handleEnterKeyPress<T = Element>(f: () => void) {
    return handleKeyPress<T>({ Enter: f })
}

export type KeyPressMap = {
    [key: string]: () => void
}

export function handleKeyPress<T = Element>(map: KeyPressMap) {
    return (e: KeyboardEvent<T>) => {
        const handler = map[e.key]
        if (handler !== undefined) {
            handler()
        }
    }
}