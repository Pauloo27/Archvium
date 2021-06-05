package folders

import (
	"fmt"
	"net/http"

	"github.com/Pauloo27/archvium/utils"
	"github.com/gofiber/fiber/v2"
)

func Index(c *fiber.Ctx) error {
	valid, username, fullPath := utils.ParsePath(utils.GetTargetPath(c))
	if !valid {
		return utils.AsError(c, http.StatusBadRequest, "Invalid path")
	}

	if username != c.Locals("user_name") {
		return utils.AsError(c, http.StatusForbidden, "You can't see that folder")
	}

	// TODO: find in db...
	fmt.Println(fullPath)

	return c.SendString("hello")
}
