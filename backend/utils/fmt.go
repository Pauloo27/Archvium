package utils

import (
	"fmt"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func Fmt(format string, v ...interface{}) string {
	return fmt.Sprintf(format, v...)
}

func GetTargetPath(c *fiber.Ctx) string {
	return strings.TrimPrefix(c.Path(), strings.TrimSuffix(c.Route().Path, "/*"))
}

func WithoutSlashSuffix(str string) string {
	return strings.TrimPrefix(str, "/")
}
