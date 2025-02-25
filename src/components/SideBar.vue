<template>
  <el-row class="tac">
    <el-col :span="3">
      <h5 class="mb-2">autoban</h5>
      <el-menu
          active-text-color="#3946ff"
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"

      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><Odometer /></el-icon>
            <span>仪表盘</span>
          </template>
            <el-menu-item index="1-1">工作台</el-menu-item>
            <el-menu-item index="1-2">事态大屏</el-menu-item>
            <el-menu-item index="1-3">实时处置流水</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><CircleClose /></el-icon>
            <span>封禁管理</span>
          </template>
          <el-menu-item index="2-1">己封禁IP</el-menu-item>
          <el-menu-item index="2-2">封禁IP变更日志</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon><CircleCheck /></el-icon>
            <span>白名单管理</span>
          </template>
          <el-menu-item index="3-1">白名单</el-menu-item>
          <el-menu-item index="3-2">白名单变更日志</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="4">
          <template #title>
            <el-icon><Refrigerator /></el-icon>
            <span>设备管理</span>
          </template>
          <el-menu-item index="4-1">告警设备</el-menu-item>
          <el-menu-item index="4-2">封禁设备</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="5">
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>系统设置</span>
          </template>
          <el-menu-item index="5-1">个人中心</el-menu-item>
          <el-menu-item index="5-2">全局配置</el-menu-item>
          <el-menu-item index="5-3">通知管理</el-menu-item>
          <el-menu-item index="5-4">证书管理</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-col>

  </el-row>
  <el-main>
    <div class="dashboard">
      <!-- 顶部统计卡片 -->
      <el-row :gutter="20" class="stat-cards">
        <el-col :span="6">
          <el-card>
            <div class="stat-item">
              <div class="title">今日封禁</div>
              <div class="number warning">14</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div class="stat-item">
              <div class="title">总封禁</div>
              <div class="number info">60</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div class="stat-item">
              <div class="title">白名单</div>
              <div class="number">0</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div class="stat-item">
              <div class="title">设备</div>
              <div class="number primary">3</div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <!-- 时间范围和生成报告按钮 -->
      <div class="time-range">
        <span>统计周期</span>
        <el-date-picker
            v-model="dateRange"
            type="datetimerange"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
        />
        <el-button type="primary">
          <el-icon><Document /></el-icon>
          生成封禁报告
        </el-button>
      </div>

      <!-- 图表区域 -->
      <el-row :gutter="20" class="charts">
        <el-col :span="12">
          <div class="chart-container">
            <h3>告警来源统计</h3>
            <canvas ref="pieChart"></canvas>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="chart-container">
            <h3>攻击地区排名</h3>
            <canvas ref="barChart"></canvas>
          </div>
        </el-col>
      </el-row>

      <!-- 实时处置流水 -->
      <div class="log-table">
        <h3>实时处置流水</h3>
        <el-table :data="logData" style="width: 100%">
          <el-table-column prop="time" label="时间" width="180" />
          <el-table-column prop="ip" label="IP" width="180" />
          <el-table-column prop="detail" label="告警详情" />
          <el-table-column prop="status" label="封禁状态" width="100" />
        </el-table>
      </div>
    </div>
  </el-main>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { Document } from '@element-plus/icons-vue'
import Chart from 'chart.js/auto'

const dateRange = ref([])
const pieChart = ref(null)
const barChart = ref(null)

// 模拟日志数据
const logData = ref([
  {
    time: '2025-02-25 17:49:38',
    ip: '211.196.31.2(韩国)',
    detail: 'SSH暴力',
    status: '已封禁'
  },
  // ... 其他日志数据
])

onMounted(() => {
  // 初始化饼图
  new Chart(pieChart.value, {
    type: 'pie',
    data: {
      labels: ['hfish'],
      datasets: [{
        data: [100],
        backgroundColor: ['#409EFF']
      }]
    },
    options: {
      responsive: true
    }
  })

  // 初始化条形图
  new Chart(barChart.value, {
    type: 'bar',
    data: {
      labels: ['新加坡/新加坡', '中国', '韩国', '伊拉克/巴格达', '中国/深圳', '俄罗斯/莫斯科', '韩国/水原市', '泰古尔', '圣基茨和尼维斯', '香港'],
      datasets: [{
        data: [2, 2, 2, 1, 1, 1, 1, 1, 1, 1],
        backgroundColor: '#409EFF'
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true
    }
  })
})
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
<style scoped>
.dashboard {
  padding: 20px;
}

.stat-cards {
  margin-bottom: 20px;
}

.stat-item {
  text-align: center;
}

.stat-item .title {
  font-size: 14px;
  color: #666;
}

.stat-item .number {
  font-size: 24px;
  margin-top: 10px;
}

.number.warning { color: #E6A23C; }
.number.info { color: #409EFF; }
.number.primary { color: #8E44AD; }

.time-range {
  margin: 20px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.chart-container {
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.chart-container h3 {
  margin-bottom: 20px;
  color: #333;
}

.log-table {
  background: #fff;
  padding: 20px;
  border-radius: 4px;
}

.log-table h3 {
  margin-bottom: 20px;
  color: #333;
}
</style>
