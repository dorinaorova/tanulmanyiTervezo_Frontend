import { Time } from "@angular/common";

export interface Period{
    id: number,
    day: string,
    start: Time,
    length: number,
    type: string
}