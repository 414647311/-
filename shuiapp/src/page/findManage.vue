<template>
  <el-col class="main" :span="20">
    <h1>管理员管理</h1>
    <el-button @click="add" plain>添加</el-button>
    <el-table max-height="780" border stripe :data="tableData" style="width: 100%">
      <el-table-column label="日期" min-width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.time | formatDate(scope.row.time) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" min-width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>密码: {{ scope.row.pass }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="密码" min-width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>密码: {{ scope.row.pass }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.pass }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加信息||修改信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" :disabled="!inp"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.pass" autocomplete="off" :disabled="!inp"></el-input>
        </el-form-item>
        <el-form-item v-if="inp" label="确认密码" :label-width="formLabelWidth">
          <el-input v-model="form.passtwo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.des" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.time"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00"
          ></el-date-picker>
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
  mounted() {
    this.$axios({
      url: API.findManage,
      method: "post"
    }).then(res => {
      console.log(res);
      this.tableData = res.data.data;
    });
  },
  filters: {
    formatDate: function(value) {
      value = Number(value);
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + MM + "-" + d + " ";
    }
  },
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        name: "",
        pass:'',
        time: "",
        passtwo:'',
        des:''
      },
      inp: false
    };
  },
  methods: {
    add() {
      this.form = {};
      this.dialogFormVisible = true;
      this.inp = true;
    },
    update() {
      this.dialogFormVisible = false;
      this.$axios({
        url: this.inp==false?API.updateManage:API.addManage,
        method: "post",
        data: this.form
      })
        .then(res => {
          this.$message({
            message: res.data.info,
            type: "success"
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleEdit(index, row) {
      console.log(row);

      this.$axios({
        url: API.findManage,
        method: "post",
        data: { id: row.id }
      }).then(res => {
        this.form = res.data.data[0];
      });
      this.inp = false;
      this.dialogFormVisible = true;
      console.log(index, row);
    },
    handleDelete(index, row) {
      this.$confirm("确认删除此管理员吗？")
        .then(_ => {
          this.$axios({
            url: API.delManage,
            method: "post",
            data: {
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
<style lang="stylus" scope>
.main {
  background-color: #f3f3f3;
  height: 889px;

  h1 {
    margin: 10px;
  }
}

.el-table {
  margin: 0 auto;
}
</style>