import {AnyAction} from "@reduxjs/toolkit";
import type { Dispatch } from 'react'

import {
    setService,
    setType,
    setCentre,
    setSearch,
} from '@/store/slices/filter-slice'

export interface ProviderFilters {
    service: string
    type:    string
    centre:  string
    search:  string
}

export function serializeFilters(filters: ProviderFilters): string {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([k, v]) => v && params.set(k, v))
    return params.toString()
}

type ProviderFilterKey = 'service' | 'type' | 'centre' | 'search'

export function applyUrlFilters(
    params: URLSearchParams,
    dispatch: Dispatch<AnyAction>
) {
    const actionMap: Record<ProviderFilterKey, (v: string) => AnyAction> = {
        service: setService,
        type:    setType,
        centre:  setCentre,
        search:  setSearch,
    }

    for (const [key, value] of params.entries()) {
        if (key in actionMap && value !== null) {
            dispatch(actionMap[key as ProviderFilterKey](value))
        }
    }
}
