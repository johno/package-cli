#!/usr/bin/env node

'use strict'

const meow = require('meow')
const isPresent = require('is-present')

const cli = meow(`
  Usage
    $ package -h

  Options
    -r, --remove Remove a key
    -a, --add Add a key

  Example
    $ package --add=awesome:value
    $ package --remove=awesome
`, {
  alias: {
    r: 'remove',
    h: 'help',
    a: 'add'
  }
})

const pkg = require('./package.json')
const keyToAdd = cli.flags.add
const keyToRemove = cli.flags.remove

if (cli.flags.help) {
  console.log(cli.help)
  process.exit(0)
}

if (isPresent(keyToAdd)) {
  const tokens = keyToAdd.split(':')
  pkg[tokens[0]] = isPresent(tokens[1]) ? tokens[1] : true
}

if (isPresent(keyToRemove)) {
  delete pkg[keyToRemove]
}

require('fs').writeFileSync('package.json', JSON.stringify(pkg, null, 2))
