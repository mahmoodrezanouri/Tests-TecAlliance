export class ToDoModel {
  
  constructor(id:number = 0 , userId:number = 0 , title:string = '',completed : boolean = false){
  
    this.id = id ;
    this.title = title;
    this.userId = userId;
    this.completed = completed;
    
  }
    id: number;
    userId :number;
    title : string;
    completed :boolean;
    
  }
