<template>
  <div class="flex flex-row">
    <el-card class="mr-10" v-for="(item, index) in cardList" :key="index" style="max-width: 240px" shadow="hover">
      {{ item.title }}
      <template #footer>
        <el-button type="primary" :icon="Share" @click="handleClick(item)" />
      </template>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { cardList } from './constants'
import { Share } from '@element-plus/icons-vue'
const router = useRouter();

const handleClick = (item) => {
  const { path } = item;
  if (!path) return
  router.push(path)
}
</script>
