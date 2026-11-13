<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Pen } from '@lucide/vue';

const emit = defineEmits<{
    edit: []
}>()

</script>

<template>
   <div class="flex items-center justify-center">
     <TooltipProvider>
        <Tooltip>
            <TooltipTrigger as-child>
                <Button @click="emit('edit')" variant="secondary" size="icon" class="h-10 w-10 rounded-full">
                    <Pen class="h-4 w-4" />
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                Edit Conversation
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
   </div>
</template>