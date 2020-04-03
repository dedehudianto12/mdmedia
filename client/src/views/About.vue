<template>
  <div
    style="width: 28%;margin: auto; margin-top: 10%; border: 1px black solid; padding: 10px; border-radius: 10px;color: white; background-color: black"
  >
    <h1 style="text-align: center" class="mb-3" for="exampleInputEmail1">Validation Code</h1>
    <form>
      <div class="form-group">
        <input v-model="validation" @change="lengthValidation" type="number" class="form-control" />
      </div>
      <div class="d-flex justify-content-center">
        <button @click="validateCode" type="submit" class="btn btn-primary mr-2">Validate</button>
        <button
          v-if="retry || this.$store.state.retry"
          @click="retryButton"
          type="submit"
          class="btn btn-danger"
        >Send Code Again</button>
      </div>
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