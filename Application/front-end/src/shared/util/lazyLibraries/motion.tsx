import { lazy } from "react"

const motion_react = import("motion/react")


const LazyMotion = lazy(() => motion_react.then(module => ({default: module.LazyMotion})))
const domAnimation = () => motion_react.then(module => module.domAnimation)

const motion = {
    li: lazy(() => motion_react.then(module => ({default: module.m.li}))),
}

export {
    motion,
    LazyMotion,
    domAnimation,
}
