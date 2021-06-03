package utils

import (
	"fmt"
	"strings"
)

func Fmt(format string, v ...interface{}) string {
	return fmt.Sprintf(format, v...)
}

func WithoutSlashSuffix(str string) string {
	return strings.TrimPrefix(str, "/")
}
