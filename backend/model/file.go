package model

import (
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type File struct {
	gorm.Model
	Path    string `gorm:"index;unique;not null"`
	OwnerID int    `gorm:"index;not null"`
	Owner   User
	Notes   string
	Size    int64
}

func (f *File) ToDto() fiber.Map {
	return fiber.Map{
		"id":        f.ID,
		"path":      f.Path,
		"ownerId":   f.OwnerID,
		"notes":     f.Notes,
		"size":      f.Size,
		"createdAt": f.CreatedAt,
		"deletedAt": f.DeletedAt,
		"updatedAt": f.UpdatedAt,
	}
}
