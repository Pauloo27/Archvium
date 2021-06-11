package folders

import (
	"net/http"
	"os"

	"github.com/Pauloo27/archvium/utils"
	"github.com/gofiber/fiber/v2"
)

func Index(c *fiber.Ctx) error {
	path, err := GetFolderByPath(c)
	if path == "" {
		return err
	}

	basePath := utils.WithoutSlashSuffix(c.Locals("ENV_STORAGE_ROOT").(string))
	files, err := os.ReadDir(basePath + path)
	if err != nil {
		return utils.AsError(c, http.StatusInternalServerError, "Cannot list files in folder")
	}

	var filesName []string

	for _, file := range files {
		filesName = append(filesName, file.Name())
	}

	return c.JSON(filesName)
}
