import { Time } from "@angular/common";

export interface Period{
    id: number,
    day: number,
    start: Time,
    length: number,
    type: string
}