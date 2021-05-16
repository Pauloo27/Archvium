package auth

import (
	"net/http"

	"github.com/Pauloo27/archvium/logger"
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

	logger.Successf("%v", payload)
	return utils.AsMsg(ctx, http.StatusCreated, "nice")
}
