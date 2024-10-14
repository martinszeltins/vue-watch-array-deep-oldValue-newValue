import cloneDeep from 'lodash/cloneDeep'
import { ref, watch, Ref, computed } from 'vue'

interface Change {
    path: string
    oldValue?: any
    newValue?: any
    oldLength?: number
    newLength?: number
}

export const useDeepWatcher = <T extends object | any[]>(source: Ref<T>) => {
    const oldValue = ref<T>(cloneDeep(source.value))
    const newValue = computed(() => cloneDeep(source.value))

    const change = ref<Change | null>(null)

    const detectChanges = (newObj: any, oldObj: any, path: string = '') => {
        if (newObj === undefined || oldObj === undefined) return

        if (typeof newObj !== 'object' || newObj === null || typeof oldObj !== 'object' || oldObj === null) {
            if (newObj !== oldObj) {
                change.value = {
                    path,
                    oldValue: oldObj,
                    newValue: newObj,
                }
            }

            return
        }

        if (Array.isArray(newObj) && Array.isArray(oldObj)) {
            if (newObj.length !== oldObj.length) {
                change.value = {
                    path,
                    oldLength: oldObj.length,
                    newLength: newObj.length,
                }
            }

            newObj.forEach((item, index) => {
                detectChanges(item, oldObj[index], `${path}[${index}]`)
            })
            
            return
        }

        const allKeys = new Set([...Object.keys(newObj), ...Object.keys(oldObj)])

        allKeys.forEach(key => {
            detectChanges(newObj[key], oldObj[key], path ? `${path}.${key}` : key)
        })
    }

    watch(newValue, (newVal, oldVal) => {
        detectChanges(newVal, oldVal)
    }, { deep: true })

    return {
        oldValue,
        newValue,
        change,
    }
}
