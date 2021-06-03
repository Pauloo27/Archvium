package files

import (
	"errors"
	"net/http"

	"github.com/Pauloo27/archvium/model"
	"github.com/Pauloo27/archvium/services/db"
	"github.com/Pauloo27/archvium/utils"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func Download(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	if err != nil {
		return utils.AsError(c, http.StatusBadRequest, "Invalid file id")
	}

	var file model.File
	err = db.Connection.First(&file, id).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return utils.AsError(c, http.StatusNotFound, "File not found")
		}
		return utils.AsError(c, http.StatusInternalServerError, "Something went wrong while getting file from DB")
	}

	if file.OwnerID != c.Locals("user_id") {
		return utils.AsError(c, http.StatusForbidden, "You can't download that file")
	}

	basePath := utils.WithSlashSuffix(c.Locals("ENV_STORAGE_ROOT").(string))

	return c.SendFile(utils.Fmt("%s%d", basePath, file.ID), true)
}
