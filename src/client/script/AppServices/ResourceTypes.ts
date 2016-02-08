
namespace AppServices {
  "use strict";

  // Journal is a simple means of forming a history of important activity
  // It's defined here because it needs to be a service someday

  export enum JournalEntryType {
    Accessed,
    Loaded,
    Error,
    Moved,
    Saved,
    Modified,
    Refreshed,
    Synchronized
  }

  export interface IJournalEntry {
    type: string;
    status: boolean;
    elapsed: number;
    date: Date;
    info: any;
  }

  export class Journal {
    public entries: IJournalEntry[] = [];

    add(entryType: JournalEntryType, status: boolean, date: Date, info?: any) {
      this.entries.unshift({
        type: JournalEntryType[entryType],
        status: status,
        elapsed: ((new Date().getMilliseconds() - date.getMilliseconds()) / 1000.0),
        date: date,
        info: info
      });
    }

    get(entryType: JournalEntryType) {
      for (var j = 0; j < this.entries.length; j++) {
        if (this.entries[j].type === JournalEntryType[entryType])
          return this.entries[j];
      }
    }
  }
}

