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
	meteor build .
	mv prototype_inss_services.tar.gz ubuntu-services_$(BUILD_NUMBER).tar.gz
	$(call green,"[Create versioned artefact for Ubuntu Services]")
