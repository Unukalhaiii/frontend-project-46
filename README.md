## Difference Generator

### Hexlet tests and linter status:
[![Actions Status](https://github.com/Unukalhaiii/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/Unukalhaiii/frontend-project-46/actions)
[![_eslint_](https://github.com/Unukalhaiii/frontend-project-46/actions/workflows/_eslint_.yml/badge.svg)](https://github.com/Unukalhaiii/frontend-project-46/actions/workflows/_eslint_.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/97bf213a2618195a23a1/maintainability)](https://codeclimate.com/github/Unukalhaiii/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/97bf213a2618195a23a1/test_coverage)](https://codeclimate.com/github/Unukalhaiii/frontend-project-46/test_coverage)

This project called "Difference Generator" was carried out by me (Sergey Morozov) as the second project assignment in the frontend developer course from Hexlet

The utility is designed to compare two files in json or yaml format and display their differences

## Setup

```
git clone https://github.com/Unukalhaiii/frontend-project-46.git
cd frontend-project-46
make install
```

## Utilities and Programming language

```
node.js: 18.14.2
commander": "^11.0.0
eslint-plugin-jest": "^27.2.3
jest": "^29.6.1
js-yaml": "^4.1.0
lodash": "^4.17.21
eslint": "^8.44.0
eslint-config-airbnb-base": "^15.0.0
eslint-plugin-import": "^2.27.5
```

## help

```
gendiff -h
```

## Test

```
make test
make test-coverage
```

## Run lint test

make lint

## Asciinema for test gendiff function with json files

[![asciicast](https://asciinema.org/a/KE4Axbt9BjyUFsDeeIib4FJny.svg)](https://asciinema.org/a/KE4Axbt9BjyUFsDeeIib4FJny)

## Asciinema for test gendiff function with yaml files

[![asciicast](https://asciinema.org/a/Gjw15oH7eEnkfEPPcFrdcHiGJ.svg)](https://asciinema.org/a/Gjw15oH7eEnkfEPPcFrdcHiGJ)

## Asciinema for stylish format

gendiff file1.json file2.json

[![asciicast](https://asciinema.org/a/9zjdarV3fgrCWB5dPAXB2iGFL.svg)](https://asciinema.org/a/9zjdarV3fgrCWB5dPAXB2iGFL)

## Asciinema for plain format

gendiff --format plain file1.json file2.json

[![asciicast](https://asciinema.org/a/QobwuY7SuMcMrTv11i1qgvOf9.svg)](https://asciinema.org/a/QobwuY7SuMcMrTv11i1qgvOf9)

## Asciinema for json format

gendiff --format json file1.json file2.json

[![asciicast](https://asciinema.org/a/0qVKqpyLLIBiMPOEiavuaklcF.svg)](https://asciinema.org/a/0qVKqpyLLIBiMPOEiavuaklcF)