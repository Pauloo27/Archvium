package model

import "gorm.io/gorm"

type File struct {
	gorm.Model
	Path    string `gorm:"index;unique;not null"`
	OwnerID int    `gorm:"index;not null"`
	Owner   User
	Notes   string
	Size    int64
}
