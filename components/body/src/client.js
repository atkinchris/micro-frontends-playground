import { mountComponent, loadById, load } from 'nova-react'

import Body from './components/Body'

const render = (name, { node, data }) => {
  if (name === 'Body') {
    return mountComponent(Body, node, data)
  }
}

document.addEventListener('NovaMount', ({ detail }) => {
  const { name, id } = detail

  const payload = loadById(name, id)

  if (payload) {
    render(name, payload)
  }
})

load('Example').forEach(render.bind(null, 'Example'))
