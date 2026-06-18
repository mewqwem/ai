"use server";

import { orderFormSchema, type OrderFormValues } from "@/lib/validations/order";
import { sendTelegramOrder } from "@/lib/telegram";

export type OrderActionResult =
  | { success: true }
  | { success: false; error: string };

// Якщо форму відправили швидше, ніж за цей час — підозра на бота
const MIN_SUBMIT_TIME_MS = 2000;

export async function submitOrderAction(
  values: OrderFormValues,
): Promise<OrderActionResult> {
  // Валідуємо ще раз і на сервері — клієнтську валідацію легко обійти
  const parsed = orderFormSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      error: "Перевірте, чи правильно заповнені поля форми",
    };
  }

  const { company, formRenderedAt, ...data } = parsed.data;

  // Honeypot: реальний користувач не бачить і не заповнює це поле.
  // Якщо воно заповнене — це бот. Вдаємо успіх, нічого не відправляючи,
  // щоб бот не зрозумів, що його відсіяли, і не намагався інакше.
  if (company) {
    return { success: true };
  }

  // Занадто швидкий сабміт — типова поведінка бота, який заповнює форму миттєво
  if (formRenderedAt) {
    const elapsed = Date.now() - Number(formRenderedAt);
    if (Number.isFinite(elapsed) && elapsed < MIN_SUBMIT_TIME_MS) {
      return { success: true };
    }
  }

  try {
    await sendTelegramOrder(data);
    return { success: true };
  } catch (error) {
    console.error("Order submit error:", error);
    return {
      success: false,
      error:
        "Не вдалося відправити заявку. Спробуйте ще раз або напишіть нам напряму в Telegram.",
    };
  }
}
