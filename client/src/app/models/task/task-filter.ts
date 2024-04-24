// za filtere treba da se zna da flagovi mogu da budu 1 ili -1 i imamo property koji ima vrendnost
// ako je 1 daje sve sto je vece ili jednako vrednosti na koju se odnosi flag, ako je -1 vraca, manje,
// searchTitle property  je case insensitive.
export interface TaskFilter {
    user_id? : number,
    project_id? : number,
    propertyName? : string,// title,start,end,..(za detalje vidi Repostories/AssignmentRepository.cs 94 linija funkcija)
    sortFlag? : number,// 1 = asc , -1 = desc
    pageNumber? : number,
    pageSize? : number,
    searchTitle? : string,
    dateStartFlag? : number,
    start? : Date,
    dateEndFlag? : number,
    end? : Date,
    stateFilter? : number,
    percentageFlag? : number,
    percentageFilter? : number,
    priorityFilter? : number
}
