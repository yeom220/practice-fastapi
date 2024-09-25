<script setup>
import data from '../assets/question.json';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import 'w2ui/w2ui-2.0.min.css';
import { w2grid, w2utils } from 'w2ui';

const renderTime = ref(0);

const changeMode = () => {
    console.log('selectType: ', gridObj.selectType);
    if (gridObj.selectType === 'row') {
        gridObj.selectType = 'cell';
    } else {
        gridObj.selectType = 'row';
    }
    gridObj.selectNone(); // row 선택이 되어있으면 모드 변경시 에러 발생
    gridObj.refresh();
};

let startTime = performance.now();
let endTime;
let gridObj;
const config = {
    grid: {
        name: 'grid',
        selectType: 'row',
        recid: 'id',
        show: {
            footer: true,
            toolbar: true,
            lineNumbers: true
        },
        columns: [
            { field: 'id', text: 'ID', sortable: true },
            {
                field: 'subject',
                text: 'SUBJECT',
                sortable: true,
                searchable: 'text'
            },
            {
                field: 'content',
                text: 'CONTENT',
                sortable: true,
                searchable: 'text'
            },
            {
                field: 'create_date',
                text: 'DATE',
                sortable: true
            }
        ],
        records: data
    }
};

onMounted(async () => {
    gridObj = new w2grid(config.grid);
    gridObj.render('#main');
    endTime = performance.now();

    renderTime.value = endTime - startTime;
});
onUnmounted(() => {
    gridObj.destroy();
});
</script>

<template>
    <div>
        <h1>렌더링 시간: {{ renderTime }} ms</h1>
    </div>
    <div id="main" style="width: 100%; height: 400px"></div>
    <br />
    <label>
        <button type="button" @click.prevent="changeMode">Toggle</button>
    </label>
</template>

<style scoped></style>
