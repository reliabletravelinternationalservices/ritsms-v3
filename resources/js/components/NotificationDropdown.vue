<script setup lang="ts">
import { ref, computed } from 'vue'
import { Bell, Check, Info, CheckCircle2, AlertTriangle, XCircle, ArrowRight } from 'lucide-vue-next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export interface NotificationModel {
  id: string | number
  title: string
  description: string
  time: string
  unread: boolean
  type?: 'info' | 'success' | 'warning' | 'error'
}

interface Props {
  notifications: NotificationModel[]
}

const props = withDefaults(defineProps<Props>(), {
  notifications: () => [],
})

const emit = defineEmits<{
  (e: 'markAsRead', id: string | number): void
  (e: 'markAllAsRead'): void
  (e: 'seeAll'): void // Updated event name for the footer action
}>()

const isOpen = ref(false)

const unreadCount = computed(() => {
  return props.notifications.filter((n) => n.unread).length
})

// Helper to render contextual icons based on notification type
const getTypeIcon = (type?: string) => {
  switch (type) {
    case 'success': return CheckCircle2
    case 'warning': return AlertTriangle
    case 'error': return XCircle
    default: return Info
  }
}

// Helper to style contextual icons color
const getTypeIconClass = (type?: string) => {
  switch (type) {
    case 'success': return 'text-emerald-500 bg-emerald-500/10'
    case 'warning': return 'text-amber-500 bg-amber-500/10'
    case 'error': return 'text-destructive bg-destructive/10'
    default: return 'text-blue-500 bg-blue-500/10'
  }
}
</script>

<template>
  <DropdownMenu v-model:open="isOpen">
    <DropdownMenuTrigger as-child>
      <Button 
        variant="outline" 
        size="icon" 
        class="relative rounded-full bg-background border-input"
        aria-label="Notifications"
      >
        <Bell class="h-5 w-5 text-muted-foreground" />
        
        <Badge 
          v-if="unreadCount > 0"
          variant="destructive" 
          class="absolute -top-1 -right-1 h-5 min-w-5 px-1 flex items-center justify-center rounded-full text-[10px] font-bold animate-pulse"
        >
          {{ unreadCount }}
        </Badge>
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent 
      align="end" 
      class="w-[360px] p-0 md:w-[400px] bg-popover border border-border shadow-lg rounded-xl overflow-hidden"
    >
      <Card class="border-0 shadow-none bg-transparent">
        <!-- Header -->
        <CardHeader class="flex flex-row items-center justify-between space-y-0 px-4 py-3 border-b border-border bg-muted/20">
          <CardTitle class="text-sm font-semibold flex items-center gap-2">
            Notifications
            <Badge v-if="unreadCount > 0" variant="secondary" class="text-xs font-normal">
              {{ unreadCount }} new
            </Badge>
          </CardTitle>
          
          <Button 
            v-if="unreadCount > 0"
            variant="ghost" 
            size="sm" 
            class="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
            @click="emit('markAllAsRead')"
          >
            Mark all read
          </Button>
        </CardHeader>

        <!-- Notification List -->
        <CardContent class="p-0 max-h-[380px] overflow-y-auto divide-y divide-border/60">
          <!-- Empty State -->
          <div v-if="notifications.length === 0" class="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div class="p-3 bg-muted rounded-full mb-3">
              <Bell class="h-6 w-6 text-muted-foreground/60" />
            </div>
            <p class="text-sm font-medium text-foreground">All caught up!</p>
            <p class="text-xs text-muted-foreground mt-1">No new notifications at the moment.</p>
          </div>

          <!-- Notification Items -->
          <div 
            v-else
            v-for="item in notifications" 
            :key="item.id"
            :class="[
              'flex items-start gap-3 p-4 transition-all relative group border-l-[3px]',
              item.unread 
                ? 'bg-accent/40 dark:bg-accent/15 border-l-primary font-medium opacity-100' 
                : 'border-l-transparent opacity-65 hover:opacity-100 hover:bg-muted/40'
            ]"
          >
            <!-- Type Status Icon -->
            <div :class="['p-2 rounded-lg shrink-0 mt-0.5', getTypeIconClass(item.type)]">
              <component :is="getTypeIcon(item.type)" class="h-4 w-4" />
            </div>

            <!-- Content Area -->
            <div class="flex-1 min-w-0 space-y-1">
              <div class="flex items-baseline justify-between gap-2">
                <p :class="['text-sm leading-tight text-foreground truncate', item.unread ? 'font-semibold' : 'font-normal']">
                  {{ item.title }}
                </p>
                <span class="text-[11px] text-muted-foreground shrink-0">{{ item.time }}</span>
              </div>
              <p class="text-xs text-muted-foreground line-clamp-2 leading-relaxed break-words">
                {{ item.description }}
              </p>
            </div>

            <!-- Actions (Inline & Cleaner) -->
            <div class="flex items-center self-center shrink-0 ml-1 min-w-[28px]">
              <Button
                v-if="item.unread"
                variant="ghost"
                size="icon"
                class="h-7 w-7 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                title="Mark as read"
                @click="emit('markAsRead', item.id)"
              >
                <Check class="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>

        <!-- Footer Actions -->
        <div v-if="notifications.length > 0" class="p-2 border-t border-border bg-muted/30">
          <Button 
            variant="ghost" 
            size="sm" 
            class="w-full text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 gap-1.5 transition-colors"
            @click="emit('seeAll')"
          >
            See all notifications
            <ArrowRight class="h-3.5 w-3.5" />
          </Button>
        </div>
      </Card>
    </DropdownMenuContent>
  </DropdownMenu>
</template>