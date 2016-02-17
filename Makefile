SHELL := /bin/bash

define green
	@tput setaf 2
	@tput bold
	@echo $1
	@tput sgr0
endef

# Build Artifact target
# =====================
BUILD_NUMBER ?= 0
.PHONY: artefact
artefact:
	rm -rf *.tar.gz
	meteor build .
	mv *.tar.gz ubuntu-services_$(BUILD_NUMBER).tar.gz
	$(call green,"[Create versioned artefact for Ubuntu Services]")
