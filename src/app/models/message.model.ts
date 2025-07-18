export class Message {
  constructor(public id? : string,
              public title? : string,
              public content? : string,
              public sender? : string,
              public receiver? : string,
              public date? : Date) {
  }
}
