package files

import (
	"io"
	"net/http"
	"os"

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

	// TODO: target folder
	// TODO: validate Filename (check if it's contains only valid character)
	// TODO: handle path validation
	// TODO: size limit
	// TODO: store in disk
	inDiskPath := utils.Fmt("%s/%s", c.Locals("ENV_STORAGE_ROOT"), file.Filename)

	inDiskFile, err := os.Create(inDiskPath)
	if err != nil {
		// TODO: handle
		panic(err)
	}

	sourceFile, err := file.Open()
	if err != nil {
		// TODO: handle
		panic(err)
	}

	_, err = io.Copy(inDiskFile, sourceFile)
	if err != nil {
		// TODO: handle
		panic(err)
	}

	err = db.Connection.Create(&storeFile).Error
	if err != nil {
		// TODO: handle
		panic(err)
	}

	return utils.AsJSON(c, http.StatusCreated, fiber.Map{"file": storeFile})
}
