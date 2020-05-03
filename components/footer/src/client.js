import { mountComponent, loadById, load } from 'nova-react'

import Footer from './components/Footer'

const render = (name, { node, data }) => {
  if (name === 'Footer') {
    return mountComponent(Footer, node, data)
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
