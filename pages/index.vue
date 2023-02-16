<script>
import "../assets/form.css";
export default {
  data() {
    return {
      textarea: '',
    };
  },

  methods: {

    validate_textarea(text) {

      if (text != null && text != "" && text != undefined) { return true; } else { return false; }

    },
    async translate() {


      //console.log(this.textarea);
      if (this.validate_textarea(this.textarea)) {
        fetch('api/translate', {
          method: "POST",
          body: JSON.stringify(this.textarea),

        }).then(async response => {

          await response.arrayBuffer()
            .then(async aray => {
              const pdf_blob = await new Blob([aray], { type: "application/pdf" })
              const data = URL.createObjectURL(pdf_blob)
              var link = document.createElement('a')
              link.href = data
              link.download = 'translate.pdf'
              link.click()
              window.URL.revokeObjectURL(pdf_blob)
            })
        })
        .catch(error => {
        //handle any errors here
      });

      } else {
        alert("Please compleate text to translate.");
      }

    }
  }
}
</script>
<template>
  <div class="form_div">
    <h1>Translator</h1>
    <label class="form_textarea_label" for="text">Text to translate</label>
    <textarea class="form_textarea" v-model="textarea" help="Please write text to translete."></textarea>
    <button class="translate_button" @click="translate()">
      translate
    </button>
  </div>


</template>