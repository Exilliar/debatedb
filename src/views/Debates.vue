<template>
  <div class="home">
    This is the debates view
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>
<script>
import HelloWorld from "@/components/HelloWorld.vue";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: { HelloWorld },
})
export default class DebatesView extends Vue {}
</script>
