<template>
  <div class="white-list">
    <!-- 顶部操作区 -->
    <div class="operation-area">
      <div class="left-area">
        <el-button type="primary" @click="handleAddWhiteList">
          <el-icon><Plus /></el-icon>
          添加白名单
        </el-button>

        <div class="search-inputs">
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
          <el-button type="primary" @click="handleSearch">
            <el-icon><Search /></el-icon>
            搜索
          </el-button>
        </div>
      </div>

      <div class="right-buttons">
        <el-button type="primary" plain>
          <el-icon><Download /></el-icon>
        </el-button>
        <el-button type="primary" plain>
          <el-icon><RefreshRight /></el-icon>
        </el-button>
        <el-button type="primary" plain>
          <el-icon><Delete /></el-icon>
        </el-button>
      </div>
    </div>

    <!-- 表格区域 -->
    <el-table
        :data="tableData"
        style="width: 100%"
        v-loading="loading"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="ip" label="IP / Cidr" min-width="180" />
      <el-table-column prop="type" label="类别" width="120" />
      <el-table-column prop="createTime" label="创建时间" width="180" />
      <el-table-column prop="expireTime" label="过期时间" width="180" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="scope">
          <el-tag :type="scope.row.status === '生效中' ? 'success' : 'info'">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" min-width="200" />
      <el-table-column label="操作" fixed="right" width="150">
        <template #default="scope">
          <el-button type="primary" link @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" link @click="handleDelete(scope.row)">删除</el-button>
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

    <!-- 添加/编辑白名单弹窗 -->
    <el-dialog
        v-model="dialogVisible"
        :title="dialogType === 'add' ? '添加白名单' : '编辑白名单'"
        width="500px"
    >
      <el-form :model="formData" label-width="100px">
        <el-form-item label="IP地址">
          <el-input v-model="formData.ip" placeholder="请输入IP地址" />
        </el-form-item>
        <el-form-item label="类别">
          <el-select v-model="formData.type" placeholder="请选择类别" style="width: 100%">
            <el-option label="永久白名单" value="permanent" />
            <el-option label="临时白名单" value="temporary" />
          </el-select>
        </el-form-item>
        <el-form-item label="过期时间" v-if="formData.type === 'temporary'">
          <el-date-picker
              v-model="formData.expireTime"
              type="datetime"
              placeholder="请选择过期时间"
              style="width: 100%"
          />
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
import { Plus, Search, Download, RefreshRight, Delete } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 搜索表单
const searchForm = reactive({
  ip: '',
  type: ''
})

// 表格数据
const tableData = ref([])
const loading = ref(false)
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(50)

// 弹窗相关
const dialogVisible = ref(false)
const dialogType = ref('add')
const formData = reactive({
  ip: '',
  type: '',
  expireTime: '',
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

// 添加白名单
const handleAddWhiteList = () => {
  dialogType.value = 'add'
  formData.ip = ''
  formData.type = ''
  formData.expireTime = ''
  formData.remark = ''
  dialogVisible.value = true
}

// 编辑白名单
const handleEdit = (row) => {
  dialogType.value = 'edit'
  Object.assign(formData, row)
  dialogVisible.value = true
}

// 删除白名单
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
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
  })
}

// 提交表单
const handleSubmit = () => {
  dialogVisible.value = false
  ElMessage({
    type: 'success',
    message: dialogType.value === 'add' ? '添加成功' : '修改成功',
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
.white-list {
  padding: 20px;
}

.operation-area {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.left-area {
  display: flex;
  gap: 20px;
  align-items: center;
}

.search-inputs {
  display: flex;
  gap: 10px;
}

.right-buttons {
  display: flex;
  gap: 10px;
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
