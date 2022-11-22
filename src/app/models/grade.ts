import { Homework } from "./homework"
import { User } from "./user"
import { ZH } from "./zh"

export interface Grade{
    subjectName: string,
    subjectId: number,
    gradeZHList: GradeZHRequestModel[],
    gradeHomeworks: GradeHomeworkRequestModel[],
}
export interface GradeZHRequestModel{
    id: number,
    user: User | null,
    zh: ZH | null,
    points: number
}

export interface GradeHomeworkRequestModel{
    id: number,
    user: User | null,
    homework: Homework | null,
    points: number
}