package files

import (
	"net/http"

	"github.com/Pauloo27/archvium/utils"
	"github.com/gofiber/fiber/v2"
)

func Info(c *fiber.Ctx) error {
	file, err := GetFileByPath(c)
	if file == nil {
		return err
	}

	return utils.AsJSON(c, http.StatusOK, file.ToDto())
}
