<template>
  <el-col class="main" :span="20">
    <h1>维修管理</h1>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="维修" name="first"></el-tab-pane>
      <el-tab-pane label="维修评论" name="second"></el-tab-pane>
    </el-tabs>

    <el-button v-if="show" @click="add" plain>添加</el-button>
    <el-select v-if="!show" v-model="id" placeholder="全部">
      <el-option v-for="item in arr" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>

    <el-table max-height="580" border stripe :data="tableData" style="width: 100%">
      <el-table-column label="序号" min-width="180">
        <template slot-scope="scope">
          <i class="el-icon-index"></i>
          <span style="margin-left: 10px">{{ scope.$index+1}}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="name" label="维修名称" min-width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>名称: {{ scope.row.name }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column v-if="tel" label="电话" min-width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>电话: {{ scope.row.tel }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.tel }}</el-tag>
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
      <el-table-column v-if="username" label="用户名称" min-width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>描述: {{ scope.row.name }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column v-if="content" label="评论内容" min-width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>描述: {{ scope.row.content }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.content }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column v-if="time" label="时间" min-width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>描述: {{ scope.row.time }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.time | capitalize(scope.row.time)}}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180">
        <template slot-scope="scope">
          <el-button v-if="name" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加水站" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商家信息" :label-width="formLabelWidth">
          <el-input v-model="form.info" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="距离" :label-width="formLabelWidth">
          <el-input v-model="form.len" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="点赞数量" :label-width="formLabelWidth">
          <el-input v-model="form.likeNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-input v-model="form.type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.tel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="评分" :label-width="formLabelWidth">
          <el-input v-model="form.score" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="浏览量" :label-width="formLabelWidth">
          <el-input v-model="form.readNum" autocomplete="off"></el-input>
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
  watch: {
    id(val) {
      this.$axios({
        url: API.findRepairComment,
        params: {
          repairId: val
        }
      })
        .then(res => {
          this.tableData = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
          len:'',
          info:'',
          name:'',
          likeNum:'',
          tel:'',
          type:'',
          score:'',
          address:'',
          readNum:'',
      },
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      activeName: "first",
      url: API.findRepair,
      delurl: API.delRepair,
      addurl: API.addRepair,
      name: true,
      type: true,
      tel: true,
      price: true,

      time: false,
      content: false,
      username: false,

      onOff: false,

      show: true,
      arr: [],
      id: ""
    };
  },
  mounted() {
    this.$axios({
      url: this.url,
      method: "get"
    }).then(res => {
      console.log(res);
      this.arr = res.data.data;
      this.tableData = res.data.data;
    });
  },
  methods: {
    handleEdit(index, row) {
      console.log(row);

      this.dialogFormVisible = true;
      this.$axios({
        url: API.findRepair,
        params: { id: row.id }
      })
        .then(res => {
            console.log(res);
            
          this.form = res.data.data[0];
          this.onOff = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    set() {
      this.dialogFormVisible = false;
      this.$axios({
        url: this.onOff == true ? API.updateRepair : API.addRepair,
        params: this.form
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
    handleClick(tab, event) {
      switch (tab.name) {
        case "first":
          this.url = API.findRepair;
          this.delurl = API.delRepair;
          this.addurl = API.addRepair;
          this.name = true;
          this.type = true;
          this.tel = true;

          this.username = false;
          this.content = false;
          this.time = false;

          this.show = true;
          break;
        case "second":
          this.url = API.findRepairComment;
          this.addurl = API.addRepairComment;
          this.delurl = API.delRepairComment;
          this.name = false;
          this.type = false;
          this.tel = false;

          this.username = true;
          this.content = true;
          this.time = true;
          this.show = false;
          break;
        default:
      }
      this.tableData = [];
      this.$axios({
        url: this.url,
        method: "get"
      }).then(res => {
        console.log(res);

        this.tableData = res.data.data;
      });
    },
    add() {
      this.onOff = false;
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
