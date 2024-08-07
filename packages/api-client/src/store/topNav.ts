import { ROUTES } from '@/constants'
import { router } from '@/router'
import type { Icon } from '@scalar/components'
import { capitalize } from '@scalar/oas-utils/helpers'
import { reactive, readonly, ref, watch } from 'vue'

import { useWorkspace } from './workspace'

const { activeRequest } = useWorkspace()

// ---------------------------------------------------------------------------
// Nav list

/** Nav Items list */
const topNavItems = reactive([{ label: '', path: '', icon: 'Add' as Icon }])
const activeNavItemIdx = ref(0)

/**
 * Logic to handle adding a nav item
 * based on the current route
 */
function handleNavLabelAdd() {
  const activeRoute = ROUTES.find((route) => {
    return router.currentRoute.value.name == route.name
  })

  if (!activeRoute) return

  // if it's a request we can push in a request
  if (activeRoute?.name === 'request') {
    topNavItems[activeNavItemIdx.value] = {
      label: activeRequest.value?.summary || '',
      path: router.currentRoute.value.path,
      icon: activeRoute.icon,
    }
  } else {
    // not requests so its the other nav items
    // we can eventually be more granular
    topNavItems[activeNavItemIdx.value] = {
      label: capitalize(activeRoute?.name) || '',
      path: router.currentRoute.value.path,
      icon: activeRoute.icon,
    }
  }
}

function handleNavRoute() {
  router.push(topNavItems[activeNavItemIdx.value].path)
}

/**
 * adding a nav item sets the new index and nav item
 * based on the route
 */
function addNavItem() {
  topNavItems.push({ label: '', path: '', icon: 'Add' })
  activeNavItemIdx.value = topNavItems.length - 1
  handleNavLabelAdd()
}

function setNavItemIdx(idx: number) {
  activeNavItemIdx.value = idx
  handleNavRoute()
}

// when the route changes we need update the active nav item
watch(
  () => router.currentRoute.value.path,
  () => {
    handleNavLabelAdd()
  },
  { immediate: true },
)

function removeNavItem(idx: number) {
  topNavItems.splice(idx, 1)
  activeNavItemIdx.value = Math.min(
    activeNavItemIdx.value,
    topNavItems.length - 1,
  )
  handleNavRoute()
}

/**
 * ## TopNav
 * Access and updaters for the top nav list
 */
export function useTopNav() {
  return {
    topNavItems: readonly(topNavItems),
    activeNavItemIdx: readonly(activeNavItemIdx),
    addNavItem,
    setNavItemIdx,
    removeNavItem,
  }
}
