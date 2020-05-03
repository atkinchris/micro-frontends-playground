import { mountComponent, loadById, load } from 'nova-react'

import Header from './components/Header'

const render = (name, { node, data }) => {
  if (name === 'Header') {
    return mountComponent(Header, node, data)
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
