package files

import (
	"net/http"

	"github.com/Pauloo27/archvium/model"
	"github.com/Pauloo27/archvium/services/db"
	"github.com/Pauloo27/archvium/utils"
	"github.com/gofiber/fiber/v2"
)

func Upload(c *fiber.Ctx) error {
	// TODO: files
	file, err := c.FormFile("file")
	if err != nil && file == nil {
		return utils.AsError(c, http.StatusBadRequest, "File missing")
	}

	storeFile := model.File{
		Path:    "/" + file.Filename,
		OwnerID: c.Locals("user_id").(int),
	}

	db.Connection.Create(&storeFile)

	return utils.AsJSON(c, http.StatusCreated, fiber.Map{"file": storeFile})
}
