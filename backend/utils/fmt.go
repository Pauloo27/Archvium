package utils

import (
	"fmt"
	"strings"
)

func Fmt(format string, v ...interface{}) string {
	return fmt.Sprintf(format, v...)
}

func WithSlashSuffix(str string) string {
	if strings.HasSuffix(str, "/") {
		return str
	}
	return str + "/"
}
