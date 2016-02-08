
export var Enums = {
  "Affinity": {
    "None": 0,
    "TypeOfValue": 1,
    "TypeOfItem": 2,
    "TypeOfList": 4,
    "TypeOfHash": 8,
    "NameIsStatic": 32,
    "NameIsProperty": 64,
    "NameIsIndex": 128,
    "NameIsKeyed": 256,
    "DataIsPartial": 1024,
    "DataIsRemote": 2048,
    "KindIsJoiner": 32768,
    "KindIsJoined": 65536,
    "PathIsVirtual": 1048576,
    "PathIsExcluded": 2097152,
    "AllowToSelect": 33554432,
    "AllowToClone": 67108864,
    "AllowToMove": 134217728,
    "AllowToEdit": 268435456,
    "AllowToSort": 536870912
  },
  "Penetration": {
    "Unknown": 0,
    "Unsupported": 4,
    "Root": 16,
    "Directory": 20,
    "Document": 32,
    "Content": 36
  }
} 

// Modules available for activation
export enum Affinity {
    None            = 0,

    TypeOfValue     = 1 << 0,   // Primitive value
    TypeOfItem      = 1 << 1,   // Object containing fixed items of different types
    TypeOfList      = 1 << 2,   // List containing multiple field or index items of same type
    TypeOfHash      = 1 << 3,   // Dictionary containing multiple keyed items of same type 

    NameIsStatic    = 1 << 5,   // property of an object that's addressed by a static name (i.e. Folders property)
    NameIsProperty  = 1 << 6,   // member of collection that's addressed by a property of itself (i.e. value of Name property)
    NameIsIndex     = 1 << 7,   // member of a ordered list that's addressed by its index value (i.e. 0, 1, 2, ...)
    NameIsKeyed     = 1 << 8,   // member of collection that's addressed by parent's keys

    DataIsPartial   = 1 << 10,  // this is a list containing partial items as placeholders
    DataIsRemote    = 1 << 11,  // this is a placeholder or partial item that must be downloaded on demand
    
    KindIsJoiner    = 1 << 15,  // remote content in child is joined (this is a parent of Joined)
    KindIsJoined    = 1 << 16,  // remote content in another branch (this is a child of Joiner)

    PathIsVirtual   = 1 << 20,  // structural item, label is hidden and name is excluded from path/address
    PathIsExcluded  = 1 << 21,  // informational item, labled is visible however name is excluded from path/address

    AllowToSelect   = 1 << 25,  // checkbox enabled and type added to selection manager
    AllowToClone    = 1 << 26,  // copy to another container
    AllowToMove     = 1 << 27,  // move from one container to another
    AllowToEdit     = 1 << 28,  // editing is facilitated by service
    AllowToSort     = 1 << 29,  // automatically arrange items within lists
}

export enum Penetration {
    Unknown         = 0,
    Unsupported     = 4,
    Root            = 16,
    Directory       = 20,
    Document        = 32,
    Content         = 36
}