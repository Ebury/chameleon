SHELL = /bin/bash
.DEFAULT_GOAL := help

COMPOSE_FILE ?= docker/docker-compose.yml
DC_BASH=docker-compose --log-level ERROR -f ${COMPOSE_FILE}
DC=@${DC_BASH}

export USER_ID=$(shell id -u)
export GROUP_ID=$(shell id -g)

##cypress-base: update Cypress base container
.PHONY: cypress-base
cypress-base:
	${DC} build --pull ec-cypress

##cypress-install: install node_modules and rebuild the cypress binaries
.PHONY: cypress-install
cypress-install: cypress-base
	${DC} run --rm ec-cypress-shell npm ci
	${DC} run --rm ec-cypress-shell npm rebuild cypress

##cypress-run: run integration tests
.PHONY: cypress-run
cypress-run:
	${DC} run --rm ec-cypress-shell npm run test:visual:ci

##cypress-integration: install and run integration tests
.PHONY: cypress-integration
cypress-integration: cypress-install cypress-run

.PHONY: help
help: Makefile
	@sed -n 's/^##//p' $<