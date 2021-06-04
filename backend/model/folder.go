package model

import "gorm.io/gorm"

type Folder struct {
  gorm.Model
  Path string 
  OwnerID int
  Owner User
}
