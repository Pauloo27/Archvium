package files

import (
	"fmt"

	"github.com/Pauloo27/archvium/utils"
	"github.com/gofiber/fiber/v2"
)

func Download(c *fiber.Ctx) error {
	file, err := GetFileFromID(c)
	if file == nil {
		return err
	}

	fmt.Println(file, err)

	basePath := utils.WithSlashSuffix(c.Locals("ENV_STORAGE_ROOT").(string))

	return c.SendFile(utils.Fmt("%s%d", basePath, file.ID), true)
}
