 <template>
   <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
     <a-form-model-item label="用户名">
       <a-input v-model="form.user" />
     </a-form-model-item>
     <a-form-model-item label="设备号">
       <a-select v-model="form.device" placeholder="请选择设备">
         <a-select-option value="shanghai">
           Zone one
         </a-select-option>
         <a-select-option value="beijing">
           Zone two
         </a-select-option>
       </a-select>
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
            user: '',
            device: undefined,
          },
        };
      },

      methods: {
        onSubmit() {
          console.log('submit!', this.form);
        },
        onReset(){
          this.form.user="";
          this.form.device=undefined;
        },
      },
    }
  </script>
  <style >
  
  </style>