package auth

import (
	"net/http"

	"github.com/Pauloo27/archvium/model"
	"github.com/Pauloo27/archvium/services/db"
	"github.com/Pauloo27/archvium/utils"
	"github.com/gofiber/fiber/v2"
)

type RegisterPayload struct {
	Username string `validate:"required,min=5,max=32"`
	Email    string `validate:"required,email"`
	Password string `validate:"required,min=5,max=32"`
}

func Register(ctx *fiber.Ctx) error {
	payload := ctx.Locals("payload").(*RegisterPayload)
	newUser := model.User{
		Email: payload.Email, Password: payload.Password, Username: payload.Username,
	}

	err := db.Connection.Create(&newUser).Error
	if err != nil {
		if utils.IsNotUnique(err) {
			return utils.AsError(ctx, http.StatusConflict, err.Error())
		} else {
			return utils.AsError(ctx, http.StatusInternalServerError, err.Error())
		}
	}

	return utils.AsJSON(ctx, http.StatusCreated, fiber.Map{"id": newUser.ID})
}
