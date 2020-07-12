<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col
            cols="2"
            class="d-flex align-center justify-center"
            style="font-size: 1.5em"
          >
            <b>{{ title }}</b>
          </v-col>
          <v-col cols="8" class="d-flex align-center justify-left">
            {{ description }}
          </v-col>
          <v-col
            cols="2"
            style="text-align: right"
            class="d-flex align-center justify-end"
          >
            <Button
              class="mr-2"
              text="Settings"
              color="primary"
              :onClick="openSettings"
            />
            <Button text="View" :onClick="view" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import Button from "./Button.vue";

import ViewCardData from "@/models/ViewCardData";

@Component({
  components: {
    Button,
  },
})
export default class ViewCard extends Vue {
  @Prop() data!: ViewCardData;

  openSettings() {
    this.$modal.show("SettingsModal");
  }

  view() {
    this.$router.push({ name: this.routeTo, params: { id: this.id } });
  }

  get id() {
    return this.data.id;
  }
  get title() {
    return this.data.title;
  }
  get description() {
    return this.data.description;
  }
  get routeTo() {
    return this.data.routeTo;
  }
}
</script>
