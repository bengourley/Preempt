all:build

build:
	uglifyjs src/Preempt.js > Preempt.min.js

.PHONY: build