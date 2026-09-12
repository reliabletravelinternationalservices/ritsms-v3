import { ref, onMounted, onBeforeUnmount } from 'vue'

export const useDestinationDropdownBreadcrumb = () => {
    const openIndex = ref<number | null>(null)

    const toggleDropdown = (index: number) => {
    openIndex.value = openIndex.value === index ? null : index
    }

    const closeDropdown = () => {
    openIndex.value = null
    }

    const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (!target.closest('.dropdown-wrapper')) {
        closeDropdown()
    }
    }

    onMounted(() => document.addEventListener('click', handleClickOutside))
    onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))

    return {
    openIndex,
    toggleDropdown,
    closeDropdown,
    }
}