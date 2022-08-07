const execa = require('execa')
const path = require('path')

// install npm create-react-app
function craNpm (pathProject, name) {
  return execa.command(
    `npx create-react-app ${path.join('/', ...pathProject, name)} --use-npm`,
    { shell: true }
  )
}

// install yarn create-react-app
function craYarn (pathProject, name) {
  return execa.command(
    `yarn create react-app ${path.join('/', ...pathProject, name)}`,
    { shell: true }
  )
}

// vue create app use npm
function vcNpm(pathProject, name) {
  return execa.command(
    `cd ${path.join('/', ...pathProject)} && npx vue create ${name} -d`,
    { shell: true }
  )
}

// vue create app use yarn
function vcYarn(pathProject, name) {
  return execa.command(
    `cd ${path.join('/', ...pathProject)} && yarn create vue-app ${name} -d`,
    { shell: true }
  )
}

module.exports = {
  vcYarn,
  vcNpm,
  craYarn,
  craNpm
}
