import { lazy } from "react"

const motion_react = import("motion/react")


const LazyMotion = lazy(() => motion_react.then(module => ({default: module.LazyMotion})))
const domAnimation = () => motion_react.then(module => module.domAnimation)

const motion = {
    div: lazy(() => motion_react.then(module => ({default: module.m.div}))),
    ul: lazy(() => motion_react.then(module => ({default: module.m.ul}))),
    li: lazy(() => motion_react.then(module => ({default: module.m.li}))),
    article: lazy(() => motion_react.then(module => ({default: module.m.article}))),
}

export {
    motion,
    LazyMotion,
    domAnimation,
}
