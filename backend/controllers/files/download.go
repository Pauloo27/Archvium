package files

import (
	"fmt"

	"github.com/Pauloo27/archvium/utils"
	"github.com/gofiber/fiber/v2"
)

func Download(c *fiber.Ctx) error {
	file, err := GetFileByPath(c)
	if file == nil {
		return err
	}

	fmt.Println(file, err)

	basePath := utils.WithoutSlashSuffix(c.Locals("ENV_STORAGE_ROOT").(string))

	return c.SendFile(basePath+file.Path, true)
}
