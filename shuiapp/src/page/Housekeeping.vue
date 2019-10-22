<template>
  <el-col class="main" :span="20">
    <h1>家政管理</h1>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="家政banner" name="first"></el-tab-pane>
      <el-tab-pane label="人员管理" name="second"></el-tab-pane>
    </el-tabs>

    <el-button @click="add" plain>添加</el-button>
    <el-select v-if="show" v-model="id" placeholder="全部">
      <el-option v-for="item in arr" :key="item" :label="item" :value="item"></el-option>
    </el-select>

    <el-table max-height="580" border stripe :data="tableData" style="width: 100%">
      <el-table-column label="序号" min-width="180">
        <template slot-scope="scope">
          <i class="el-icon-index"></i>
          <span style="margin-left: 10px">{{ scope.$index+1}}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="img" label="banner图" min-width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>名称: {{ scope.row.img }}</p>
            <div slot="reference" class="name-wrapper">
              <img width="150" :src="scope.row.img" alt />
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column v-if="name" label="名称" min-width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>电话: {{ scope.row.name }}</p>
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
      <el-table-column v-if="price" label="价格" min-width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>价格: {{ scope.row.price }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.price }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column v-if="age" label="年龄" min-width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>年龄: {{ scope.row.age }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.age }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column v-if="age" label="学历" min-width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>学历: {{ scope.row.edu }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.edu }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column v-if="type" label="服务类型" min-width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>服务类型: {{ scope.row.type |str }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.type | str }}</el-tag>
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

    <el-dialog title="添加家教" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item v-if="img" label="上传图片" :label-width="formLabelWidth">
          <el-input v-model="form.img" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="!img" label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="!img" label="年龄" :label-width="formLabelWidth">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="!img" label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.tel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="!img" label="资格认证" :label-width="formLabelWidth">
          <el-checkbox-group v-model="form.qualification">
            <el-checkbox label="身份证" value="身份证"></el-checkbox>
            <el-checkbox label="学位证" value="学位证"></el-checkbox>
            <el-checkbox label="健康证" value="健康证"></el-checkbox>
            <el-checkbox label="上岗证" value="上岗证"></el-checkbox>
            <el-checkbox label="母婴护理师证" value="母婴护理师证"></el-checkbox>
            <el-checkbox label="催乳师证" value="催乳师证"></el-checkbox>
            <el-checkbox label="产后恢复师证" value="产后恢复师证"></el-checkbox>
            <el-checkbox label="助理家政管理师" value="助理家政管理师"></el-checkbox>
            <el-checkbox label="家政管理师" value="家政管理师"></el-checkbox>
            <el-checkbox label="高级家政管理师" value="高级家政管理师"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item v-if="!img" label="服务项目" :label-width="formLabelWidth">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="保姆" value="保姆"></el-checkbox>
            <el-checkbox label="月嫂" value="月嫂"></el-checkbox>
            <el-checkbox label="钟点工" value="钟点工"></el-checkbox>
            <el-checkbox label="保洁" value="保洁"></el-checkbox>
            <el-checkbox label="家电清洗" value="家电清洗"></el-checkbox>
            <el-checkbox label="家具保养" value="家具保养"></el-checkbox>
            <el-checkbox label="新居开荒" value="新居开荒"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item v-if="!img" label="学历" :label-width="formLabelWidth">
          <el-input v-model="form.edu" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="!img" label="工作年限" :label-width="formLabelWidth">
          <el-input v-model="form.year" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="!img" label="级别" :label-width="formLabelWidth">
          <el-input v-model="form.vNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="!img" label="价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="!img" label="城市" :label-width="formLabelWidth">
          <el-input v-model="form.city" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="!img" label="经验" :label-width="formLabelWidth">
          <el-input v-model="form.experience" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="!img" label="点赞数量" :label-width="formLabelWidth">
          <el-input v-model="form.likeNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="!img" label="关注人数" :label-width="formLabelWidth">
          <el-input v-model="form.readNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="!img" label="距离" :label-width="formLabelWidth">
          <el-input v-model="form.len" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="!img" label="自我评价" :label-width="formLabelWidth">
          <el-input v-model="form.info" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="!img" label="爆照" :label-width="formLabelWidth">
          <el-input v-model="form.img" autocomplete="off"></el-input>
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
  filters: {
    str: function(value) {
      return value.replace(/["\[\]]/g, "");
    }
  },
  watch: {
    id(val) {
      this.$axios({
        url: API.findHomeWorker,
        params: {
          type: val
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
        city: "",
        year: "",
        vNum: "",
        price: "",
        city: "",
        experience: "",
        likeNum: "",
        readNum: "",
        len: "",
        info: "",
        img: "",
        qualification: [],
        type: []
      },
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      activeName: "first",
      url: API.homeBanner,
      delurl: API.delHomeBanner,
      addurl: API.addHomeBanner,

      img: true,

      name: false,
      type: false,
      price: false,
      age: false,
      tel: false,

      onOff: false,

      show: false,
      id: "",
      arr: []
    };
  },
  mounted() {
    this.$axios({
      url: API.getHomeType,
      method: "get"
    }).then(res => {
      this.arr = res.data.type;
    });

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
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.$axios({
        url: API.findHomeWorker,
        params: { id: row.id }
      })
        .then(res => {
          if (res.data.data[0].qualification.indexOf("[") == -1) {
            res.data.data[0].qualification = res.data.data[0].qualification.split(
              ","
            );
            res.data.data[0].type = res.data.data[0].type.split(",");
          } else {
            res.data.data[0].qualification = JSON.parse(
              res.data.data[0].qualification
            );
            res.data.data[0].type = JSON.parse(res.data.data[0].type);
          }

          this.form = res.data.data[0];
          this.onOff = true;
          this.init();
        })
        .catch(err => {
          console.log(err);
        });
    },
    set() {
      this.dialogFormVisible = false;
      if (this.activeName == "first") {
        this.$axios({
          url: API.addHomeBanner,
          params: this.form
        })
          .then(res => {
            this.$message({
              message: res.data.info,
              type:res.data.code=='0'?"success":"warning"
            });
            this.init();
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$axios({
          url: this.onOff == true ? API.updateHomeWorker : API.addHomeWorker,
          params: this.form
        })
          .then(res => {
            this.$message({
              message: res.data.info,
              type:res.data.code=='0'?"success":"warning"
            });
            this.init();
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    handleClick(tab, event) {
      switch (tab.name) {
        case "first":
          this.url = API.homeBanner;
          this.delurl = API.delHomeBanner;
          this.addurl = API.addHomeBanner;
          this.img = true;

          this.name = false;
          this.type = false;
          this.price = false;
          this.age = false;
          this.tel = false;

          this.show = false;
          break;
        case "second":
          this.url = API.findHomeWorker;
          this.addurl = API.addHomeWorker;
          this.delurl = API.delHomeWorker;
          this.img = false;

          this.name = true;
          this.type = true;
          this.price = true;
          this.age = true;
          this.tel = true;
          this.show = true;
          break;
        default:
      }
      this.tableData = [];
      this.init();
    },
    add() {
      this.onOff = false;
      this.form = {
        city: "",
        year: "",
        vNum: "",
        price: "",
        city: "",
        experience: "",
        likeNum: "",
        readNum: "",
        len: "",
        info: "",
        img: "",
        qualification: [],
        type: []
      };
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