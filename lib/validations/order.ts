import { z } from "zod";

export const contactMethodOptions = ["email", "telegram", "instagram"] as const;
export type ContactMethod = (typeof contactMethodOptions)[number];

// Telegram-нік: починається з @, далі літера, потім літери/цифри/_ — 5-32 символи всього
const TELEGRAM_REGEX = /^@[a-zA-Z][a-zA-Z0-9_]{4,31}$/;

// Instagram-нік: 1-30 символів, літери/цифри/крапки/підкреслення,
// без подвійних крапок, не починається і не закінчується крапкою
const INSTAGRAM_REGEX = /^(?!\.)(?!.*\.\.)[a-zA-Z0-9_.]{1,30}(?<!\.)$/;

export const orderFormSchema = z
  .object({
    name: z.string().trim().min(2, "Ім'я повинно містити щонайменше 2 символи"),

    // Email — завжди обов'язковий, незалежно від обраного способу зв'язку.
    // Потрібен для майбутніх листів-підтверджень.
    email: z
      .string()
      .trim()
      .min(1, "Email обов'язковий")
      .email("Введіть коректний email, наприклад name@example.com"),

    contactMethod: z.enum(contactMethodOptions),

    // Заповнюється тільки якщо обрано telegram або instagram
    contactValue: z.string().trim().optional(),

    comment: z.string().trim().max(500, "Коментар занадто довгий").optional(),

    serviceId: z.string().optional(),
    serviceTitle: z.string().optional(),
    servicePrice: z.union([z.string(), z.number()]).optional(),

    // --- Анти-спам поля, користувач їх не бачить ---
    // Honeypot: справжня людина це поле ніколи не заповнить
    company: z.string().max(0, "Це поле має бути порожнім").optional(),
    // Час рендеру форми (мс) — щоб відсіяти миттєві сабміти від ботів
    formRenderedAt: z.union([z.string(), z.number()]).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.contactMethod === "telegram") {
      if (!data.contactValue || !TELEGRAM_REGEX.test(data.contactValue)) {
        ctx.addIssue({
          path: ["contactValue"],
          code: z.ZodIssueCode.custom,
          message:
            "Telegram-нік має починатись з @ і містити 5-32 символи (літери, цифри, _)",
        });
      }
    }

    if (data.contactMethod === "instagram") {
      const handle = (data.contactValue ?? "").replace(/^@/, "");
      if (!handle || !INSTAGRAM_REGEX.test(handle)) {
        ctx.addIssue({
          path: ["contactValue"],
          code: z.ZodIssueCode.custom,
          message:
            "Вкажіть коректний Instagram-нік (1-30 символів, без подвійних крапок, не з крапки)",
        });
      }
    }
  });

export type OrderFormValues = z.infer<typeof orderFormSchema>;
