import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import LoginView from '../views/LoginView.vue'


describe('LoginView.vue Test', () => {
  it('renders form when component created', () => {
    // render the component
    const wrapper = shallowMount(LoginView);
    // check that the title is rendered
    expect(wrapper.text()).toMatch('Vue Project')
  })
})