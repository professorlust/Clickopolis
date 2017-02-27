class Collection<T> {
  name:string;
  items:any[];

  push(item:T):void {
    this.items.push(item);
  }

  delete(query:string):void {
    this.items.splice(this.get(query, true), 1);
  }

  get(query:string, returnIndex: boolean = false):number | any {
    let items = this.items;
    let item:any;
    let index:number;

    for (let i = 0; i < items.length; i++) {
      if (items[i].name === query) {
        item = items[i];
        index = i;
      }
    }
    if (returnIndex) {
      return index;
    } else {
      return item;
    }
  }

  contains(query:string) {
    return this.items.indexOf(this.get(query)) > -1;
  }

  constructor(name: string = 'Collection', items: T[]) {
    this.name = name;
    this.items = items;
  }

}

export = Collection;
