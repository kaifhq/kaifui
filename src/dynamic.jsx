/** @jsx Kaif.h @jsxFrag Kaif.Fragment */
import Kaif from 'kaif'
import './style.css'

const DynamicApp = ({ getDynamicConfig }) => {
  const {
    close,
    cancel,
    okay,
    title,
    inputs,
    onsubmit,
    onclose,
  } = getDynamicConfig()
  
  const Title = typeof title === 'string'
    ? (<h2>{title}</h2>)
    : typeof title === 'function'
    ? title()
    : ''

  const Cancel = typeof cancel === 'string'
    ? (<a onclick={close}>{cancel}</a>)
    : typeof cancel === 'function'
    ? cancel()
    : ''

  const Okay = typeof okay === 'string'
    ? (<button>{okay}</button>)
    : typeof okay === 'function'
    ? okay()
    : ''

  const Inputs = Array.isArray(inputs)
    ? (<>{inputs.map(n => <input name={n}/>)}</>)
    : typeof inputs === 'function'
    ? inputs()
    : ''

  if (!Title && !Inputs && !Okay && !Cancel) {
    return (
      <dialog className="kaifui-dynamic"/>
    )
  }

  return (
    <dialog
      onclick={close}
      onclose={onclose}
      className="kaifui-dynamic"
    >
      <form
        onclick={e => e.stopPropagation()}
        onsubmit={onsubmit}
      >
        {Title}
        {Inputs}
        <div className="button-group">
          {[Cancel, Okay].filter(v => !!v)}
        </div>
      </form>
    </dialog>
  )
}

let render = null
let dynamicRoot = null
let dynamicConfig = null
const getDynamicConfig = () => dynamicConfig

const initDynamic = (config) => {
  dynamicConfig = config
  if (render != null) {
    render()
    return dynamicRoot
  }

  dynamicRoot = document.querySelector('.kaifui-dynamic')
  if (!dynamicRoot) {
    dynamicRoot = document.createElement('dialog')
    document.body.append(dynamicRoot)
  }
  render = Kaif.init(
    dynamicRoot,
    DynamicApp.bind(null, {getDynamicConfig}),
  )

  return dynamicRoot
}

export const dynamic = {
  alert(config = 'Alert') {
    return new Promise((resolve, reject) => {
      config = Object.assign({
          cancel: 'Close',
          close: () => {
            dynamicConfig = {}
            dynamicRoot.close()
            resolve()
          },
          onclose: () => {
            dynamicConfig = {}
            resolve()
          },
        },
        typeof config === 'string'
          ? { title: config }
          : config
      )

      initDynamic(config)
        .showModal()
    })
  },
  confirm(config = 'Confirm') {
    return new Promise((resolve, reject) => {
      config = Object.assign({
          cancel: 'Close',
          okay: 'OK',
          close: () => {
            dynamicConfig = {}
            dynamicRoot.close()
            resolve(false)
          },
          onsubmit: (e) => {
            e.preventDefault()
            resolve(true)
            dynamicConfig = {}
            dynamicRoot.close()
          },
          onclose: () => {
            dynamicConfig = {}
            resolve(false)
          },
        },
        typeof config === 'string'
          ? { title: config }
          : config
      )

      initDynamic(config)
        .showModal()
    })
  },
  prompt(config = 'Prompt') {
    return new Promise((resolve, reject) => {
      config = Object.assign({
          cancel: 'Close',
          okay: 'OK',
          inputs: ['val'],
          close: () => {
            dynamicConfig = {}
            dynamicRoot.close()
            resolve('')
          },
          onsubmit: (e) => {
            e.preventDefault()
            const obj = {}
            new FormData(e.target)
              .forEach((v, k) => obj[k] = v)
            const keys = Object.keys(obj)
            resolve(
              keys.length === 1
                ? obj[keys[0]]
                : obj
            )

            dynamicConfig = {}
            dynamicRoot.close()
          },
          onclose: () => {
            dynamicConfig = {}
            resolve('')
          },
        },
        typeof config === 'string'
          ? { title: config }
          : config
      )

      initDynamic(config)
        .showModal()
    })
  },
}
