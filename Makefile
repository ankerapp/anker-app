ifeq ($(OS), Windows_NT)
build:
	python build.py
	npm run build
else
build:
	python3 build.py
	npm run build
endif
