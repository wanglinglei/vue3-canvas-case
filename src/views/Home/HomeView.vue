<template>
  <div class="flex flex-row">
    <el-card class="mr-10 text-center" v-for="(item, index) in cardList" :key="index" style="min-width: 240px"
      shadow="hover">
      {{ item.title }}
      <el-divider>
        <el-icon><star-filled /></el-icon>
      </el-divider>
      <div class=" text-gray-500">{{ item.description }}</div>
      <template #footer>
        <el-button type="primary" :icon="Share" @click="handleClick(item)" />
      </template>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { cardList } from './constants'
// @ts-ignore
import { Share } from '@element-plus/icons-vue'
const router = useRouter();

const handleClick = (item) => {
  const { path } = item;
  if (!path) return
  router.push(path)
}
</script>
