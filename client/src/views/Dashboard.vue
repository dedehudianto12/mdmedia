<template>
  <div class="container">
    <h1 style="text-align : center">Welcome Dashboard</h1>
    <div class="d-flex justify-content-center" style="margin-top: 10%">
      <div>
        <b-button v-b-modal.modal-1>Reset Your Password</b-button>

        <b-modal id="modal-1" title="Reset Your Password" hide-footer>
          <form>
            <div class="form-group">
              <label for="exampleInputPassword1">Current Password</label>
              <input
                v-model="current_password"
                type="password"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">New Password</label>
              <input
                v-model="new_password"
                type="password"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Re-Enter New Password</label>
              <input
                v-model="reenter_new_password"
                type="password"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <button @click="changePassword" type="submit" class="btn btn-primary">Submit</button>
          </form>
        </b-modal>
      </div>
      <div>
        <button @click="logOut" type="button" class="btn btn-danger">Log Out</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current_password: "",
      new_password: "",
      reenter_new_password: ""
    };
  },
  methods: {
    changePassword() {
      const obj = {
        current_password: this.current_password,
        new_password: this.new_password,
        reenter_new_password: this.reenter_new_password
      };
      this.$store.dispatch("changePassword", obj);
      this.$bvModal.hide("modal-1");
    },
    logOut() {
      localStorage.clear();
      this.$router.push("/");
    }
  }
};
</script>

<style>
</style>