package utils

import (
	"net/http"

	"github.com/go-playground/validator"
	"github.com/gofiber/fiber/v2"
)

type ValidationError struct {
	Field, Error string
}

func Validate(a interface{}) *[]*ValidationError {
	var errs []*ValidationError

	validate := validator.New()
	rawErrs := validate.Struct(a)

	if rawErrs == nil {
		return nil
	}

	for _, err := range rawErrs.(validator.ValidationErrors) {
		errs = append(errs, &ValidationError{
			Field: err.StructField(), Error: Fmt("%s: %s", err.Tag(), err.Param()),
		})
	}

	return &errs
}

func ParseAndValidate(payload interface{}) fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		if err := ctx.BodyParser(payload); err != nil {
			return AsError(ctx, http.StatusBadRequest, "Missing payload")
		}

		errs := Validate(payload)
		if errs != nil {
			ctx.Response().SetStatusCode(fiber.StatusBadRequest)
			return ctx.JSON(errs)
		}

		ctx.Locals("payload", payload)
		return ctx.Next()
	}
}
