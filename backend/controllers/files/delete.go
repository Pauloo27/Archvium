package files

import (
	"net/http"
	"os"

	"github.com/Pauloo27/archvium/services/db"
	"github.com/Pauloo27/archvium/utils"
	"github.com/gofiber/fiber/v2"
)

func Delete(c *fiber.Ctx) error {
	file, err := GetFileByPath(c)
	if file == nil {
		return err
	}

	basePath := utils.WithoutSlashSuffix(c.Locals("ENV_STORAGE_ROOT").(string))

	err = db.Connection.Unscoped().Delete(&file).Error
	if err != nil {
		return utils.AsError(c, http.StatusInternalServerError, "Something went wrong while deleting file from DB")
	}

	err = os.Remove(utils.Fmt("%s/%s", basePath, file.Path))
	if err != nil {
		return utils.AsError(c, http.StatusInternalServerError, "Something went wrong while deleting file from disk")
	}

	return c.SendStatus(http.StatusNoContent)
}
