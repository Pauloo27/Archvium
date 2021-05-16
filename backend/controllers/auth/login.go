package auth

import (
	"errors"
	"net/http"

	"github.com/Pauloo27/archvium/model"
	"github.com/Pauloo27/archvium/services/db"
	"github.com/Pauloo27/archvium/utils"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type LoginPayload struct {
	Username string `validate:"required,min=5,max=32"`
	Password string `validate:"required,min=5,max=32"`
}

func Login(ctx *fiber.Ctx) error {
	payload := ctx.Locals("payload").(*LoginPayload)

	var user model.User
	err := db.Connection.First(&user,
		"username = ? AND password = ?", payload.Username, utils.HashPassword(payload.Password),
	).Error

	if err != nil {
		if errors.Is(gorm.ErrRecordNotFound, err) {
			return utils.AsError(ctx, http.StatusNotFound, "Invalid password or username")
		} else {
			return utils.AsError(ctx, http.StatusInternalServerError, err.Error())
		}
	}

	// TODO: token
	return utils.AsMsg(ctx, http.StatusAccepted, "logged!")
}
