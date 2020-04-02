<template>
  <div style="width: 30%;margin: auto; margin-top: 10%">
    <label for="exampleInputEmail1">Validation Code</label>
    <form>
      <div class="form-group">
        <input v-model="validation" @change="lengthValidation" type="number" class="form-control" />
      </div>
      <button @click="validateCode" type="submit" class="btn btn-primary">Validate</button>
      <button
        v-if="retry || this.$store.state.retry"
        @click="retryButton"
        type="submit"
        class="btn btn-danger"
      >Send Code Again</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      validation: "",
      retry: localStorage.getItem("retry")
    };
  },
  methods: {
    lengthValidation(event) {
      console.log("okk");
      // let temp = "";
      // if (this.validation.length > 6) {
      //   temp = this.validation.slice(0, 5);
      // }
      // this.validation = temp;
    },
    validateCode() {
      const obj = {
        validation_number: this.validation
      };
      this.$store.dispatch("otpValidation", obj);
      this.count++;
    },
    retryButton() {
      this.$store.dispatch("retryOtp");
    }
  }
};
</script>