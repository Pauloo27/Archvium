package files

import (
	"errors"
	"net/http"
	"os"

	"github.com/Pauloo27/archvium/model"
	"github.com/Pauloo27/archvium/services/db"
	"github.com/Pauloo27/archvium/utils"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func Delete(c *fiber.Ctx) error {
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

	// why not pass the user id in the SQL query? 
	// cuz in the future "share" will be added
	if file.OwnerID != c.Locals("user_id") {
		return utils.AsError(c, http.StatusForbidden, "You can't delete that file")
	}

	basePath := utils.WithSlashSuffix(c.Locals("ENV_STORAGE_ROOT").(string))

	err = db.Connection.Delete(&file).Error
	if err != nil {
		return utils.AsError(c, http.StatusInternalServerError, "Something went wrong while deleting file from DB")
	}

	err = os.Remove(utils.Fmt("%s%d", basePath, file.ID))
	if err != nil {
		return utils.AsError(c, http.StatusInternalServerError, "Something went wrong while deleting file from disk")
	}

	return c.SendStatus(http.StatusNoContent)
}
