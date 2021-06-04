package files

import (
	"errors"
	"net/http"
	"strings"

	"github.com/Pauloo27/archvium/model"
	"github.com/Pauloo27/archvium/services/db"
	"github.com/Pauloo27/archvium/utils"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func GetFileByPath(c *fiber.Ctx) (*model.File, error) {
	path := strings.TrimPrefix(c.Path(), strings.TrimSuffix(c.Route().Path, "/*"))
	if path == "" {
		return nil, utils.AsError(c, http.StatusBadRequest, "Invalid file path")
	}

	var file model.File
	err := db.Connection.First(&file, "path = ? AND is_folder = false", path).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, utils.AsError(c, http.StatusNotFound, "File not found")
		}
		return nil, utils.AsError(c, http.StatusInternalServerError, "Something went wrong while getting file from DB")
	}

	// why not pass the user id in the SQL query?
	// cuz in the future "share" will be added
	if file.OwnerID != c.Locals("user_id") {
		return nil, utils.AsError(c, http.StatusForbidden, "You can't download that file")
	}
	return &file, nil
}
