<script setup>
import data from '../assets/question.json';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { Tabulator } from 'tabulator-tables';

const renderTime = ref(0);

let startTime = performance.now();
let endTime;

let table;

onMounted(async () => {
    table = new Tabulator('#main', {
        layout: 'fitColumns',
        headerSortElement: "<i class='fas fa-arrow-up'></i>",
        // autoColumns: true,
        columns: [
            { field: 'id', title: 'ID' },
            {
                field: 'subject',
                title: 'SUBJECT',
                sorter: 'string',
                editor: true
            },
            {
                field: 'content',
                title: 'CONTENT',
                editor: true
            },
            {
                field: 'create_date',
                title: 'DATE',
                editor: true
            }
        ],
        data: data
    });

    endTime = performance.now();
    renderTime.value = endTime - startTime;
});
onUnmounted(() => {
    table.destroy();
});
</script>

<template>
    <div>
        <h1>렌더링 시간: {{ renderTime }} ms</h1>
    </div>
    <div id="main" style="width: 100%; height: 400px"></div>
    <!-- <br />
    <label>
        <button type="button" @click.prevent="">Toggle</button>
    </label> -->
</template>

<style scoped></style>
