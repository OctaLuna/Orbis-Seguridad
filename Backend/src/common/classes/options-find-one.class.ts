import { DataSource } from "typeorm"

export class OptionsFindOne {
    manager?: DataSource | null = null
    throwException?: boolean = false
}