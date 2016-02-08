exports.Enums = {
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
};
// Modules available for activation
(function (Affinity) {
    Affinity[Affinity["None"] = 0] = "None";
    Affinity[Affinity["TypeOfValue"] = 1] = "TypeOfValue";
    Affinity[Affinity["TypeOfItem"] = 2] = "TypeOfItem";
    Affinity[Affinity["TypeOfList"] = 4] = "TypeOfList";
    Affinity[Affinity["TypeOfHash"] = 8] = "TypeOfHash";
    Affinity[Affinity["NameIsStatic"] = 32] = "NameIsStatic";
    Affinity[Affinity["NameIsProperty"] = 64] = "NameIsProperty";
    Affinity[Affinity["NameIsIndex"] = 128] = "NameIsIndex";
    Affinity[Affinity["NameIsKeyed"] = 256] = "NameIsKeyed";
    Affinity[Affinity["DataIsPartial"] = 1024] = "DataIsPartial";
    Affinity[Affinity["DataIsRemote"] = 2048] = "DataIsRemote";
    Affinity[Affinity["KindIsJoiner"] = 32768] = "KindIsJoiner";
    Affinity[Affinity["KindIsJoined"] = 65536] = "KindIsJoined";
    Affinity[Affinity["PathIsVirtual"] = 1048576] = "PathIsVirtual";
    Affinity[Affinity["PathIsExcluded"] = 2097152] = "PathIsExcluded";
    Affinity[Affinity["AllowToSelect"] = 33554432] = "AllowToSelect";
    Affinity[Affinity["AllowToClone"] = 67108864] = "AllowToClone";
    Affinity[Affinity["AllowToMove"] = 134217728] = "AllowToMove";
    Affinity[Affinity["AllowToEdit"] = 268435456] = "AllowToEdit";
    Affinity[Affinity["AllowToSort"] = 536870912] = "AllowToSort";
})(exports.Affinity || (exports.Affinity = {}));
var Affinity = exports.Affinity;
(function (Penetration) {
    Penetration[Penetration["Unknown"] = 0] = "Unknown";
    Penetration[Penetration["Unsupported"] = 4] = "Unsupported";
    Penetration[Penetration["Root"] = 16] = "Root";
    Penetration[Penetration["Directory"] = 20] = "Directory";
    Penetration[Penetration["Document"] = 32] = "Document";
    Penetration[Penetration["Content"] = 36] = "Content";
})(exports.Penetration || (exports.Penetration = {}));
var Penetration = exports.Penetration;
