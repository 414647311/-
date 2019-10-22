<template>
  <el-col class="main" :span="20">
    <h1>家教管理</h1>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="家教banner" name="first"></el-tab-pane>
      <el-tab-pane label="家教类型" name="second"></el-tab-pane>
      <el-tab-pane label="家教排行" name="third"></el-tab-pane>
    </el-tabs>

    <el-button @click="add" plain>添加</el-button>
    <el-table max-height="580" border stripe :data="tableData" style="width: 100%">
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
      <el-table-column v-if="des" label="描述" min-width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>描述: {{ scope.row.des }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.des }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column v-if="type" label="类型" min-width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>描述: {{ scope.row.type }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.type }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column v-if="num" label="报名人数" min-width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>描述: {{ scope.row.num }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.num }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column v-if="teacher" label="授课机构" min-width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>描述: {{ scope.row.teacherImg }}</p>
            <div slot="reference" class="name-wrapper">
              <img width="150" :src="scope.row.teacherImg" alt />
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
        <el-form-item v-if="des" label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.des" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="type" label="类型" :label-width="formLabelWidth">
          <el-input v-model="form.type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="num" label="人数" :label-width="formLabelWidth">
          <el-input v-model="form.num" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="teacher" label="授课机构" :label-width="formLabelWidth">
          <el-input v-model="form.teacherImg" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="set">确 定</el-button>
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
      disabled: false,
      activeName: "first",
      url: API.teacherBanner,
      delurl: API.delTeacherBanner,
      addurl: API.addTeacherBanner,
      des: true,
      type: false,
      num: false,
      teacher: false
    };
  },

  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$axios({
        url: this.url,
        method: "get"
      }).then(res => {
        this.tableData = res.data.data;
      });
    },
    set() {
      this.dialogFormVisible = false;
      this.$axios({
        url: this.addurl,
        params: this.form
      })
        .then(res => {
          this.$message({
            message: res.data.info,
            type: res.data.code=='0'?"success":"warning"
          });
          this.init();
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleClick(tab, event) {
      switch (tab.name) {
        case "first":
          this.url = API.teacherBanner;
          this.delurl = API.delTeacherBanner;
          this.addurl = API.addTeacherBanner;
          this.des = true;
          this.type = false;
          this.num = false;
          this.teacher = false;
          break;
        case "second":
          this.url = API.teacherType;
          this.addurl = API.addTeacherType;
          this.delurl = API.delTeacherType;
          this.des = false;
          this.type = true;
          this.num = false;
          this.teacher = false;
          break;
        case "third":
          this.url = API.teacherTop;
          this.addurl = API.addTeacherTop;
          this.delurl = API.delTeacherTop;
          this.des = false;
          this.type = false;
          this.num = true;
          this.teacher = true;
          break;
        default:
      }
      this.tableData = [];
      this.$axios({
        url: this.url,
        method: "get"
      }).then(res => {
        this.tableData = res.data.data;
      });
    },
    add() {
      this.form = {};
      this.dialogFormVisible = true;
    },

    handleDelete(index, row) {
      this.$confirm("确认删除吗？")
        .then(_ => {
          this.$axios({
            url: this.delurl,
            method: "get",
            params: {
              id: row.id
            }
          })
            .then(res => {
              this.tableData.splice(index, 1);
              this.$message({
                message: res.data.info,
                type: res.data.code=='0'?"success":"warning"
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