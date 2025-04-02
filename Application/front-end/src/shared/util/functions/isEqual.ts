export function isEquals<T extends Object>(obj1: T, obj2: T): boolean {
    if (typeof obj1 !== typeof obj2) return false

    for (const key of Object.keys(obj1) as (keyof T)[]) {
        if (obj1[key] !== obj2[key]) 
            return false
    }

    return true
}
