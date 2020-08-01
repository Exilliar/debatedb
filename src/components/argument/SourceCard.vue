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
              "{{ quoteText(quote) }}"
              <span v-if="quoteAdditional(quote)">
                - {{ quoteAdditional(quote) }}
              </span>
            </li>
          </ul>
        </div>
        <div class="mb-2">
          <h2>Notes</h2>
          <vue-markdown :source="notes" />
        </div>
      </v-card-text>
      <v-card-actions class="d-flex justify-space-between">
        <span>
          <Button class="mr-2" text="edit" :onClick="editSourceModal" />
          <Button text="add quote" :onClick="addQuoteModal" />
        </span>
        <SettingsButton
          :deleteMethod="deleteSource"
          :id="source.id"
          :additional="deleteQuotes"
        />
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import VueMarkdown from "vue-markdown";

import Button from "@/components/Button.vue";
import SettingsButton from "@/components/SettingsButton.vue";

import UserInput, { UserInputText, UserInputLink } from "@/models/UserInput";
import InputModalInput from "@/models/InputModalInput";
import DeleteMethod from "@/models/DeleteMethod";

import SourceTbl from "@/db/elements/sourceTbl";
import { Source } from "@/db/ArgumentView";
import QuoteTbl from "@/db/elements/quoteTbl";
import { Additional } from "../../models/SettingsModalInput";

@Component({
  components: { Button, VueMarkdown, SettingsButton },
})
export default class SourceCard extends Vue {
  @Prop() source!: Source;
  @Prop() addQuoteFunc!: (
    quote: string,
    additional: string,
    sourceid: number
  ) => any;
  @Prop() editFunc!: (
    link: string,
    quotes: QuoteTbl[],
    notes: string,
    sourceid: number
  ) => any;
  @Prop() sourceDeleteMethod!: DeleteMethod;
  @Prop() quoteDeleteMethod!: DeleteMethod;

  editSourceModal() {
    const editLink = this.link;
    const editNotes = this.notes;

    const editModalLink: UserInputLink = {
      id: 0,
      type: "link",
      textInput: editLink,
    };
    const editModalNotes: UserInputText = {
      id: this.quotes.length * 2 + 1,
      title: "Notes",
      description:
        "Notes about the source. Should be things like qualifiers and other thoughts about the source",
      textInput: editNotes,
      type: "text",
      markdown: true,
    };

    const inputs: UserInput[] = [editModalLink];

    this.addQuotesToInputs(inputs);

    inputs.push(editModalNotes);

    const editModalData: InputModalInput = {
      params: {
        title: "Edit Source",
        inputs: inputs,
      },
    };

    this.$modal.show("InputModal", {
      title: "Edit Source",
      inputs: inputs,
      onClose: this.editOnClose,
    });
  }

  addQuotesToInputs(inputs: UserInput[]) {
    const editQuotesQuote = this.quotes.map((q) => q.text);
    const editQuotesAdditional = this.quotes.map((q) => q.additional);
    let id = 1;
    let quoteNumber = 1;

    for (let i = 0; i < this.quotes.length; i++) {
      const editQuote: UserInputText = {
        id: id,
        title: "Quote " + quoteNumber,
        description: "A direct quote from the source. Do not use quote marks",
        textInput: editQuotesQuote[i],
        type: "text",
        markdown: false,
      };
      id++;
      const editAdditional: UserInputText = {
        id: id,
        title: "Additional notes about quote " + quoteNumber,
        description:
          "Very short notes about the quote. E.g. the page that the quote is on",
        textInput: editQuotesAdditional[i],
        type: "text",
        markdown: false,
      };
      id++;
      quoteNumber++;
      inputs.push(editQuote);
      inputs.push(editAdditional);
    }
  }

  editOnClose(inputs: UserInput[]) {
    const link = inputs[0].textInput;
    const notes = inputs[inputs.length - 1].textInput;

    const editQuotes = new Array<QuoteTbl>();

    let id = 1;

    for (let i = 0; i < this.quotes.length; i++) {
      editQuotes.push({
        id: this.quotes[i].id,
        text: inputs[id].textInput,
        additional: inputs[id + 1].textInput,
        sourceid: this.source.id,
      });
      id += 2;
    }

    this.editFunc(link, editQuotes, notes, this.id);
  }

  addQuoteModal() {
    const addQuote = "";
    const addAdditional = "";

    const addModalQuote: UserInputText = {
      id: 0,
      title: "Quote",
      description: "A direct quote from the source. Do not add quote marks",
      textInput: addQuote,
      type: "text",
      markdown: false,
    };
    const addModalAdditional: UserInputText = {
      id: 1,
      title: "Addition notes",
      description:
        "Very short notes about the quote. E.g. the page that the quote is on",
      textInput: addAdditional,
      type: "text",
      markdown: false,
    };

    const inputs = [addModalQuote, addModalAdditional];

    this.$modal.show("InputModal", {
      title: "Add Quote",
      inputs: inputs,
      onClose: this.addOnClose,
    });
  }

  addOnClose(inputs: UserInputText[]) {
    const quote = inputs[0].textInput;
    const additional = inputs[1].textInput;

    this.addQuoteFunc(quote, additional, this.id);
  }

  // Quotes in the correct format to be passed into the settings modal to be deleted
  get deleteQuotes(): Additional {
    return {
      title: "Quotes",
      deleteMethod: this.quoteDeleteMethod,
      items: this.quotes.map((q) => {
        return {
          title: q.text,
          id: q.id,
        };
      }),
    };
  }

  get deleteSource() {
    return this.sourceDeleteMethod;
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
