import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })

  
export class DateconverterService {

    public createDateStringWithYear(paramDate: any){
        var date = String(new Date(paramDate)).split(' ') 
        var dd = date[2].substring(0,2);
        var mm = date[1]
        var yyyy = date[3]
        var dayStr = `${yyyy}. ${mm}. ${dd}.`
        return dayStr
      }

      public createDateString(paramDate: any){
        var date = String(new Date(paramDate)).split(' ') 
        var dd = date[2].substring(0,2);
        var mm = date[1]
        var dayStr = `${mm}. ${dd}.`
        return dayStr
      }

      convertDayByNumber(day: number){
        switch (day){
          case 1:
            return "Hétfő";
          case 2:
            return "Kedd";
          case 3:
            return "Szerda";
          case 4:
            return "Csütörtök";
          case 5:
            return "Péntek";
          default:
            return "HIBA";
        }
      }

      convertDayByName(day: String){
        switch (day){
          case "Hétfő":
            return 1;
          case "Kedd":
            return 2;
          case "Szerda":
            return 3;
          case "Csütörtök":
            return 4;
          case "Péntek":
            return 5;
          default:
            return 0;
        }
      }
}