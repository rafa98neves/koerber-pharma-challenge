import { describe, it, expect, beforeEach } from 'vitest';
import login from '../views/LoginView.vue';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';

describe('Test login mounting', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders form when component created', () => {
    const wrapper = mount(login);
    expect(wrapper.exists()).toBeTruthy();
  });
});
