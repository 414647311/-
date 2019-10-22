<template>
  <el-col class="main" :span="20">
    <h1>banner管理</h1>
    <el-button @click="add" plain>添加</el-button>
    <el-table max-height="780" border stripe :data="tableData" style="width: 100%">
      <el-table-column label="序号" min-width="180">
        <template slot-scope="scope">
          <i class="el-icon-index"></i>
          <span style="margin-left: 10px">{{ scope.$index+1}}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片" min-width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>图片: {{ scope.row.img }}</p>
            <div slot="reference" class="name-wrapper">
              <img width="150" :src="scope.row.img" alt />
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="描述" min-width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>描述: {{ scope.row.des }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.des }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加信息||修改信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="上传图片" :label-width="formLabelWidth">
         <el-input v-model="form.img" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.des" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
  </el-col>
</template>
<script>
import API from "../common/js/API";
export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        img: "",
        des: ""
      },
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false
    }
  },
  mounted() {
    this.$axios({
      url: API.banner,
      method: "get"
    }).then(res => {
      console.log(res);
      this.tableData = res.data.data;
    });
  },
  methods: {
    
    add() {
      this.form = {};
      this.dialogFormVisible = true;
    },
    update() {
      this.dialogFormVisible = false;
      this.$axios({
        url: API.addbanner,
        method: "get",
        params: this.form
      })
        .then(res => {
            console.log(res);
            
          this.$message({
            message: res.data.info,
            type: "success"
          });
        })
        .catch(err => {
          console.log(err);
        });
    },

    handleDelete(index, row) {
      this.$confirm("确认删除此banner图吗？")
        .then(_ => {
          this.$axios({
            url: API.delbanner,
            method: "get",
            params: {
              id: row.id
            }
          })
            .then(res => {
              this.tableData.splice(index, 1);
              this.$message({
                message: res.data.info,
                type: "success"
              });
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(_ => {});
    }
  }
};
</script>
<style>
</style>