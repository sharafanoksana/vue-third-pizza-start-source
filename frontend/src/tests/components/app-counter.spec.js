import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import AppCounter from "@/common/components/AppCounter.vue";

describe("Test app counter", () => {
  it("Должен произвести emit", async () => {
    const wrapper = mount(AppCounter, {
      props: {
        value: 1,
        maxValue: 2,
      },
    });
    /* Имитируем клик по кнопке «Больше» */
    await wrapper.get(".counter__button--plus").trigger("click");
    /* Ждём, пока обработчик события input выполнится */
    await wrapper.vm.$nextTick();
    /* Проверяем, что событие input было вызвано c аргументом 2 */
    expect(wrapper.emitted().input[0]).toEqual([2]);
  });
  it("Не должен произвести emit с максимальным значением", async () => {
    const wrapper = mount(AppCounter, {
      props: {
        value: 2,
        maxValue: 2,
      },
    });
    /* Имитируем клик по кнопке «Больше» */
    await wrapper.get(".counter__button--plus").trigger("click");
    /* Ждём, пока обработчик события input выполнится */
    await wrapper.vm.$nextTick();
    /* Проверяем, что событие input не было вызвано */
    expect(wrapper.emitted().input).toBeFalsy();
  });
});
