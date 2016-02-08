"use strict";

export var Hierarchy = {
  "Directory": {
    "BranchName": "Directory",
    "ServiceRoute": "transform/dir",
    "RootParentType": "FolderResource",
    "TypeListFull": [
      "FolderResource.Folder",
      "Folder.Folders",
      "Folder.Files",
      "Folders.Folder",
      "Files.File",
    ],
    "TypeListRemote": [
      "FolderResource.Folder"
    ],
    "ByParent": {
      "FolderResource": [
        {
          "Affinity": 1050658,
          "TypeBranch": "Directory",
          "TypeParent": "FolderResource",
          "TypeNode": "Folder",
          "NamePath": "Folder",
          "NameLabel": "Folder"
        }
      ],
      "Folder": [
        {
          "Affinity": 1048612,
          "TypeBranch": "Directory",
          "TypeParent": "Folder",
          "TypeNode": "Folders",
          "TypeItems": "Folder",
          "NamePath": "Folders",
          "NameLabel": "Folders"
        },
        {
          "Affinity": 1048612,
          "TypeBranch": "Directory",
          "TypeParent": "Folder",
          "TypeNode": "Files",
          "TypeItems": "File",
          "NamePath": "Files",
          "NameLabel": "Files"
        }
      ],
      "Folders": [
        {
          "Affinity": 66,
          "TypeBranch": "Directory",
          "TypeParent": "Folders",
          "TypeNode": "Folder",
          "PropNamePath": "Name",
          "PropNameLabel": "Name"
        }
      ],
      "Files": [
        {
          "Affinity": 32834,
          "TypeBranch": "Directory",
          "TypeParent": "Files",
          "TypeNode": "File",
          "PropNamePath": "Name",
          "PropNameLabel": "DisplayName"
        }
      ],
      "File": [
        {
          "Affinity": 34670592,
          "TypeBranch": "InvDocument",
          "TypeParent": "File",
          "TypeNode": "InvDataDefinitions",
          "PropParentMatch": "Name",
          "ValueMatch": ".xlsx"
        }
      ]
    }
  }
}

