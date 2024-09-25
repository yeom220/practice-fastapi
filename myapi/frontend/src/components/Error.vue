<script setup>
import { defineProps } from 'vue';

const props = defineProps(['error']);
</script>

<template>
    <div
        class="alert alert-danger"
        role="alert"
        v-if="typeof error.detail === 'string'"
    >
        <div>
            {{ error.detail }}
        </div>
    </div>
    <div
        class="alert alert-danger"
        role="alert"
        v-else-if="typeof error.detail === 'object' && error.detail.length > 0"
    >
        <div v-for="(err, index) in error.detail" :key="index">
            <strong>{{ err.loc[1] }}</strong> : {{ err.msg }}
        </div>
    </div>
</template>

<style scoped></style>
