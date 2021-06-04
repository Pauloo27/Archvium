package utils

import (
	"net/http"
	"regexp"
	"strings"

	"github.com/go-playground/validator"
	"github.com/gofiber/fiber/v2"
)

type ValidationError struct {
	Field string `json:"field"`
	Error string `json:"error"`
}

var wordRegex = regexp.MustCompile(`^\w+$`)

func IsWord(str string) bool {
	return wordRegex.MatchString(str)
}

var fileNameRegex = regexp.MustCompile(`^[\w|\.]+$`)

func IsValidFileName(str string) bool {
	return fileNameRegex.MatchString(str)
}

func IsNotUnique(err error) bool {
	// FIXME
	// There's no gorm.ErrUnique... so... raw string check?
	return strings.HasPrefix(err.Error(), "ERROR: duplicate key value")
}

var duplicatedKeyRegex = regexp.MustCompile(`"\w+_(\w+)_key"`)

func GetDuplicatedKey(err error) string {
	if !IsNotUnique(err) {
		return ""
	}
	match := duplicatedKeyRegex.FindStringSubmatch(err.Error())

	return match[1]
}

func Validate(a interface{}) *[]*ValidationError {
	var errs []*ValidationError

	validate := validator.New()
	rawErrs := validate.Struct(a)

	if rawErrs == nil {
		return nil
	}

	for _, err := range rawErrs.(validator.ValidationErrors) {
		tag := err.Tag()
		param := err.Param()
		if param != "" {
			errs = append(errs, &ValidationError{
				Field: err.StructField(), Error: Fmt("%s: %s", tag, param),
			})
		} else {
			errs = append(errs, &ValidationError{
				Field: err.StructField(), Error: tag,
			})
		}
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
			return ctx.JSON(fiber.Map{"errors": errs})
		}

		ctx.Locals("payload", payload)
		return ctx.Next()
	}
}
