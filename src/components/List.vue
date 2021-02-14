<template>
    <div>
        <div class="project-header">
            <el-row>
                <el-col :span="7"></el-col>
                <el-col :span="7">
                    <el-input
                        size="medium"
                        class="project-input"
                        v-model="listQuery.goodsName"
                        clearable
                        @keyup.enter="searchFn"
                        placeholder="请输入商品名称搜索">
                    </el-input>
                </el-col>
                <el-button type="primary" size="medium" @click="searchFn">查 询</el-button>
                <el-button type="primary" size="medium" @click="addData">新 建</el-button>
            </el-row>
        </div>
        <el-table v-loading="loading" :data="tableList" align="center" class="table-box">
            <el-table-column align="center" label="商品名称" prop="goodsName"> </el-table-column>
            <el-table-column align="center" label="商品英文名称" prop="englishName">
            </el-table-column>
            <el-table-column align="center" label="商品简称" prop="shortName"> </el-table-column>
            <el-table-column align="center" label="商品描述" prop="goodsDesc"> </el-table-column>
            <el-table-column align="center" label="商品品牌" prop="goodsbrand"> </el-table-column>
            <el-table-column align="center" label="商品规格" prop="goodsSpec"> </el-table-column>
            <!-- 操作列 -->
            <el-table-column label="操作" align="center">
                <template v-slot="scope">
                    <el-button type="text" icon="el-icon-remove" @click="handleDelete(scope.row.id)"
                        >删除</el-button>
                    <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)"
                        >编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page-footer-box">
            <el-pagination
                class="text-right"
                background
                @current-change="handleCurrentChange"
                layout="prev, pager, next"
                :total="total"
                :current-page="currentPage">
            </el-pagination>
        </div>
        <!-- 弹窗 -->
        <el-dialog
            width="500px"
            :title="status ? '修改' : '新增'"
            v-model="visible"
            @close="handleCloseDialog">
            <el-form
                size="mini"
                :model="formData"
                :rules="rules"
                label-width="120px"
                ref="ruleForm"
                style="padding: 0 20px">
                <el-form-item :title="'商品名称'" :label="'商品名称'" prop="goodsName">
                    <el-input
                        v-model="formData.goodsName"
                        :placeholder="'请输入商品名称'"></el-input>
                </el-form-item>
                <el-form-item :title="'商品ID'" :label="'商品ID'" prop="id">
                    <el-input v-model="formData.id" :placeholder="'请输入商品名称'"></el-input>
                </el-form-item>
                <el-form-item :title="'商品英文名称'" :label="'商品英文名称'" prop="englishName">
                    <el-input
                        v-model="formData.englishName"
                        :placeholder="'请输入商品英文名称'"></el-input>
                </el-form-item>
                <el-form-item :title="'商品简称'" :label="'商品简称'" prop="shortName">
                    <el-input
                        v-model="formData.shortName"
                        :placeholder="'请输入商品简称'"
                    ></el-input>
                </el-form-item>
                <el-form-item :title="'商品描述'" :label="'商品描述'" prop="goodsDesc">
                    <el-input
                        v-model="formData.goodsDesc"
                        :placeholder="'请输入商品描述'"></el-input>
                </el-form-item>
                <el-form-item :title="'商品品牌'" :label="'商品品牌'" prop="goodsbrand">
                    <el-input
                        v-model="formData.goodsbrand"
                        :placeholder="'请输入商品品牌'"
                    ></el-input>
                </el-form-item>
                <el-form-item :title="'商品规格'" :label="'商品规格'" prop="goodsSpec">
                    <el-input
                        v-model="formData.goodsSpec"
                        :placeholder="'请输入商品规格'"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button size="mini" @click="handleCloseDialog">取 消</el-button>
                    <el-button type="primary" size="mini" @click="submitDialog">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script lang="ts">
import { getList, deleteItem, addItem, updateItem } from '../api/list'
import { defineComponent, onMounted, ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { ListQuery, TableList, DataList } from '../typings'

export default defineComponent({
    name: 'goodlist',
    props: {
        msg: {
            required: true,
            default: () => [],
            type: String,
        },
    },
    setup(props) {
        const status = ref(false)
        const formData = reactive<TableList>({
            id: '',
            goodsName: '',
            englishName: '',
            shortName: '',
            goodsDesc: '',
            goodsbrand: '',
            goodsSpec: '',
        })
        const visible = ref(false)
        const ruleForm = ref<any>(null)
        const rules = {
            id: [{ required: true, message: '请输入商品id', trigger: 'blur' }],
            goodsName: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
            englishName: [{ required: true, message: '请输入商品英文名称', trigger: 'blur' }],
            shortName: [{ required: true, message: '请输入商品简称', trigger: 'blur' }],
            goodsDesc: [{ required: true, message: '请输入商品描述', trigger: 'blur' }],
            goodsbrand: [{ required: true, message: '请输入商品品牌', trigger: 'blur' }],
            goodsSpec: [{ required: true, message: '请输入商品规格', trigger: 'blur' }]
        }
        const addData = () => {
            visible.value = true
            status.value = false
            formData.id = ''
            formData.goodsName = ''
            formData.englishName = ''
            formData.shortName = ''
            formData.goodsDesc = ''
            formData.goodsbrand = ''
            formData.goodsSpec = ''
        }
        const handleEdit = (row: TableList) => {
            visible.value = true
            status.value = true
            formData.id = row.id
            formData.goodsName = row.goodsName
            formData.englishName = row.englishName
            formData.shortName = row.shortName
            formData.goodsDesc = row.goodsDesc
            formData.goodsbrand = row.goodsbrand
            formData.goodsSpec = row.goodsSpec
        }
        const handleCloseDialog = () => {
            formData.id = ''
            formData.goodsName = ''
            formData.englishName = ''
            formData.shortName = ''
            formData.goodsDesc = ''
            formData.goodsbrand = ''
            formData.goodsSpec = ''
            ruleForm.value.resetFields()
            visible.value = false
        }
        const currentPage = ref<number>(1)
        const loading = ref<boolean>(false)
        const total = ref<number>(1)
        const tableList = ref<TableList[]>([
            {
                id: '',
                goodsName: '',
                englishName: '',
                shortName: '',
                goodsDesc: '',
                goodsbrand: '',
                goodsSpec: '',
            },
        ])
        const listQuery = reactive<ListQuery>({
            pageNo: 1, // 当前页码
            pageSize: 10, // 单页显示数量
            goodsName: '', // 项目名称
        })
        const getDataList = () => {
            getList<DataList>(listQuery)
                .then((res) => {
                    tableList.value = res.data.list
                    total.value = res.data.totalCount
                })
                .finally(() => {
                    loading.value = false
                })
        }
        const handleDelete = (val: string) => {
            deleteItem<DataList>({ id: val }).then(() => {
                ElMessage.success({
                    message: '删除成功',
                    type: 'success',
                })
                getDataList()
            })
        }
        const handleAdd = (val: TableList) => {
            addItem<DataList>(val).then(() => {
                ElMessage.success({
                    message: '添加成功',
                    type: 'success',
                })
                getDataList()
            })
        }
        const updateData = (val: TableList) => {
            updateItem<DataList>(val).then(() => {
                ElMessage.success({
                    message: '修改成功',
                    type: 'success',
                })
                getDataList()
            })
        }
        // 提交表单
        const submitDialog = () => {
            ruleForm.value.validate((valid: boolean) => {
                if (!valid) return false
                if (status.value) {
                    visible.value = false
                    updateData(formData)
                } else {
                    visible.value = false
                    handleAdd(formData)
                }
            })
        }
        onMounted(() => {
            loading.value = true
            console.log(props.msg, 444)
            getDataList()
        })
        const searchFn = () => {
            getDataList()
        }
        const handleCurrentChange = (val: number) => {
            listQuery.pageNo = val
            getDataList()
        }

        return {
            status,
            visible,
            ruleForm,
            currentPage,
            getList,
            rules,
            tableList,
            formData,
            listQuery,
            getDataList,
            handleCurrentChange,
            searchFn,
            loading,
            total,
            handleDelete,
            handleEdit,
            handleCloseDialog,
            submitDialog,
            addData,
        }
    },
})
</script>
<style scoped>
.table-box {
    height: 640px;
    overflow: auto;
}
.page-footer-box {
    text-align: right;
    margin-top: 15px;
}
</style>
