<template>
  <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-model-item label="用户名">
      <a-input v-model="form.owner" />
    </a-form-model-item>
    <a-form-model-item label="设备号">
      <a-input v-model="form.name" />
    </a-form-model-item>

    <a-form-model-item :wrapper-col="{ span: 24, offset: 4 }">
      <a-button type="primary" @click="onSubmit">
        创建
      </a-button>
      <a-button style="margin-left: 10px;" @click="onReset">
        重置
      </a-button>
    </a-form-model-item>
  </a-form-model>
  
</template> 

<script>

export default {
name: 'form1',

data() {
  return {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
    form: {
      owner: '',
      name: '',
    },
  };
},

methods: {
  info() {
      this.$message.info('创建成功');
    },
  onSubmit() {
    console.log('submit!', this.form);
    this.$axios.post('/devices', {
        deviceName : this.form.name ,
        owner: this.form.owner ,
      }).then(res => {
        console.log(res);
        alert("创建成功");
        this.$emit('create');
        this.modalVisible = false;
      }).catch(e => {
        console.error(e);
      })
  },
  onReset(){
    this.form.user="";
    this.form.device='';
  },
},
}
</script>
  <style >
  
  </style>