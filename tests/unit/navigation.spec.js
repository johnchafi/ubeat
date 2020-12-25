import { mount, RouterLinkStub } from '@vue/test-utils';
import Navigation from "@/components/Navigation.vue";
import Vue from 'vue'
import Vuetify from 'vuetify'


Vue.use(Vuetify)


describe("Navigation.vue", () => {
    const navigation = mount(Navigation)
    const Component = {
        template: '<v-tab v-on:click="$emit(\'click\')"></v-tab>'
      }

    it ('Route to Home page' , () => {
        const onClick = navigation.loadAHomePage()
        const wrapper = mount(Component, {
            listeners: {
              click: onClick
            }
          })
        wrapper.trigger('click')
        expect(onClick).toHaveBeenCalled()
        wrapper.destroy()
        onClick.destroy()
    })


})
