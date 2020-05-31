<template>
  <v-container>
    <v-card>
      <v-card-title class="justify-center">
        {{ title }}
      </v-card-title>
      <v-card-subtitle class="text-center">
        <a :href="link">{{ link }}</a>
      </v-card-subtitle>
      <v-card-text>
        <div class="mb-4">
          <h2>Quotes:</h2>
          <ul>
            <li v-for="quote in quotes" :key="quoteid(quote)">
              "{{ quoteText(quote) }}" - {{ quoteAdditional(quote) }}
            </li>
          </ul>
        </div>
        <div class="mb-2">
          <h2>Notes</h2>
          {{ notes }}
        </div>
      </v-card-text>
      <v-card-actions>
        <Button text="edit" />
        <Button text="add quote" :onClick="addModal" />
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import SourceTbl from "../db/newIdea/elements/sourceTbl";
import { Source } from "../db/newIdea/ArgumentView";

import Button from "./TheButton.vue";
import QuoteTbl from "../db/newIdea/elements/quoteTbl";
import { UserInputText } from "../models/UserInput";
import ModalInput from "../models/ModalInput";

@Component({
  components: { Button },
})
export default class SourceCard extends Vue {
  @Prop() source!: Source;
  @Prop() addQuoteFunc!: (
    quote: string,
    additional: string,
    sourceid: number
  ) => any;

  addQuote = "";
  addAdditional = "";

  addModalQuote: UserInputText = {
    id: 0,
    title: "Quote",
    description: "A direct quote from the source. Do not add quote marks",
    textInput: this.addQuote,
    type: "text",
    markdown: false,
  };
  addModalAdditional: UserInputText = {
    id: 1,
    title: "Addition notes",
    description:
      "Very short notes about the quote. E.g. the page that the quote is on",
    textInput: this.addAdditional,
    type: "text",
    markdown: false,
  };
  addModalData: ModalInput = {
    params: {
      title: "Add Quote",
      inputs: [this.addModalQuote, this.addModalAdditional],
    },
  };

  addOnClose(inputs: UserInputText[]) {
    const quote = inputs[0].textInput;
    const additional = inputs[1].textInput;

    this.addQuoteFunc(quote, additional, this.id);
  }

  addModal() {
    this.$modal.show("InputModal", {
      title: this.addModalData.params.title,
      inputs: this.addModalData.params.inputs,
      onClose: this.addOnClose,
    });
  }

  get id() {
    return this.source.id;
  }
  get title() {
    return this.source.title;
  }
  get link() {
    return this.source.link;
  }
  get notes() {
    return this.source.notes;
  }
  get quotes() {
    return this.source.quotes;
  }
  quoteid(quote: QuoteTbl) {
    return quote.id;
  }
  quoteText(quote: QuoteTbl) {
    return quote.text;
  }
  quoteAdditional(quote: QuoteTbl) {
    return quote.additional;
  }
}
</script>
