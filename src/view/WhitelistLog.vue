<template>
  <div class="ip-management">
    <!-- 搜索区域 -->
    <div class="search-area">
      <el-input
          v-model="searchForm.ip"
          placeholder="IP"
          style="width: 200px"
      />
      <el-input
          v-model="searchForm.type"
          placeholder="类别"
          style="width: 200px"
      />
      <el-button type="primary" @click="handleSearch">搜索</el-button>
    </div>

    <!-- 表格区域 -->
    <el-table
        :data="tableData"
        style="width: 100%"
        v-loading="loading"
    >
      <el-table-column prop="ip" label="IP / Cidr" min-width="180" />
      <el-table-column prop="type" label="类别" width="120" />
      <el-table-column prop="remark" label="备注" min-width="200" />
      <el-table-column prop="updateTime" label="变更时间" width="180" />
      <el-table-column prop="status" label="状态" width="120">
        <template #default="scope">
          <el-tag
              :type="scope.row.status === '删除' ? 'danger' : 'success'"
              size="small"
          >
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="150">
        <template #default="scope">
          <el-button
              type="primary"
              link
              @click="handleEdit(scope.row)"
              v-if="scope.row.status !== '删除'"
          >
            编辑
          </el-button>
          <el-button
              type="danger"
              link
              @click="handleDelete(scope.row)"
              v-if="scope.row.status !== '删除'"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <div class="pagination">
      <span class="total">共 {{ total }} 条</span>
      <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="prev, pager, next, sizes"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
      <span class="page-text">前往</span>
    </div>

    <!-- 编辑弹窗 -->
    <el-dialog
        v-model="dialogVisible"
        title="编辑IP信息"
        width="500px"
    >
      <el-form :model="formData" label-width="100px">
        <el-form-item label="IP地址">
          <el-input v-model="formData.ip" disabled />
        </el-form-item>
        <el-form-item label="类别">
          <el-select v-model="formData.type" placeholder="请选择类别" style="width: 100%">
            <el-option label="本地服务" value="本地服务" />
            <el-option label="其他" value="其他" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
              v-model="formData.remark"
              type="textarea"
              placeholder="请输入备注信息"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 搜索表单
const searchForm = reactive({
  ip: '',
  type: ''
})

// 表格数据
const tableData = ref([
  {
    ip: '101.42.16.99',
    type: '本地服务',
    remark: 'xxx',
    updateTime: '2025-02-23 21:55:59',
    status: '删除'
  },
  {
    ip: '101.42.16.99',
    type: '本地服务',
    remark: 'xxx',
    updateTime: '2025-02-23 21:55:44',
    status: '手动添加'
  }
])

const loading = ref(false)
const total = ref(2)
const currentPage = ref(1)
const pageSize = ref(50)

// 弹窗相关
const dialogVisible = ref(false)
const formData = reactive({
  ip: '',
  type: '',
  remark: ''
})

// 搜索方法
const handleSearch = () => {
  loading.value = true
  // 实现搜索逻辑
  setTimeout(() => {
    loading.value = false
  }, 500)
}

// 编辑方法
const handleEdit = (row) => {
  formData.ip = row.ip
  formData.type = row.type
  formData.remark = row.remark
  dialogVisible.value = true
}

// 删除方法
const handleDelete = (row) => {
  ElMessageBox.confirm(
      `确定要删除IP ${row.ip} 吗？`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(() => {
    // 实现删除逻辑
    row.status = '删除'
    row.updateTime = new Date().toLocaleString()
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
  })
}

// 提交表单
const handleSubmit = () => {
  // 实现更新逻辑
  const targetRow = tableData.value.find(item => item.ip === formData.ip)
  if (targetRow) {
    targetRow.type = formData.type
    targetRow.remark = formData.remark
    targetRow.updateTime = new Date().toLocaleString()
  }

  dialogVisible.value = false
  ElMessage({
    type: 'success',
    message: '更新成功',
  })
}

// 分页方法
const handleSizeChange = (val) => {
  pageSize.value = val
  handleSearch()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  handleSearch()
}
</script>

<style scoped>
.ip-management {
  padding: 20px;
}

.search-area {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
}

.total {
  color: #606266;
  font-size: 14px;
}

.page-text {
  color: #606266;
  font-size: 14px;
}

:deep(.el-table) {
  margin-top: 20px;
}

:deep(.el-input__wrapper) {
  border-radius: 2px;
}

:deep(.el-button) {
  border-radius: 2px;
}

:deep(.el-dialog__body) {
  padding-top: 10px;
}
</style>
