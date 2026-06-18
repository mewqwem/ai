"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  orderFormSchema,
  type OrderFormValues,
  type ContactMethod,
} from "@/lib/validations/order";
import { submitOrderAction } from "@/app/order/actions";
import { Button } from "@/components/ui/Button/Button";
import uaLocale from "@/locales/ua.json";

interface OrderFormProps {
  defaultService?: {
    id: string;
    title: string;
    price: number;
  };
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const CONTACT_METHODS: { value: ContactMethod; label: string }[] = [
  { value: "email", label: "Email" },
  { value: "telegram", label: "Telegram" },
  { value: "instagram", label: "Instagram" },
];

export const OrderForm: React.FC<OrderFormProps> = ({ defaultService }) => {
  const t = uaLocale.order;
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  // Фіксуємо момент рендеру форми один раз — використовується для анти-спам перевірки
  const [formRenderedAt] = useState(() => Date.now());

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      name: "",
      email: "",
      contactMethod: "email",
      contactValue: "",
      comment: "",
      serviceId: defaultService?.id ?? "",
      serviceTitle: defaultService?.title ?? "",
      servicePrice: defaultService?.price ?? "",
      company: "",
      formRenderedAt,
    },
  });

  const contactMethod = watch("contactMethod");

  const onSubmit = async (values: OrderFormValues) => {
    setStatus("submitting");
    setServerError(null);

    const result = await submitOrderAction(values);

    if (result.success) {
      setStatus("success");
      reset();
    } else {
      setStatus("error");
      setServerError(result.error);
    }
  };

  if (status === "success") {
    return (
      <div className="bg-bg-card border border-white/10 rounded-2xl p-8 text-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-text-main mb-2">{t.successTitle}</h3>
        <p className="text-text-muted mb-6">{t.successText}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button href="/catalog" variant="primary">
            {t.successCtaCatalog}
          </Button>
          <Button variant="outlined" onClick={() => setStatus("idle")}>
            {t.successButton}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-bg-card border border-white/10 rounded-2xl p-6 md:p-8 space-y-5"
    >
      {/* Приховані поля з даними обраної послуги */}
      <input type="hidden" {...register("serviceId")} />
      <input type="hidden" {...register("serviceTitle")} />
      <input type="hidden" {...register("servicePrice")} />
      <input type="hidden" {...register("formRenderedAt")} />

      {/* Honeypot — видимий ботам у DOM, прихований від людей і скрінрідерів */}
      <div
        className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="company">Не заповнюйте це поле</label>
        <input
          type="text"
          id="company"
          tabIndex={-1}
          autoComplete="off"
          {...register("company")}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-muted mb-2">
          {t.nameLabel}
        </label>
        <input
          {...register("name")}
          type="text"
          placeholder={t.namePlaceholder}
          className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-text-main placeholder:text-text-muted/60 focus:outline-none focus:border-brand transition-colors"
        />
        {errors.name && (
          <p className="text-red-400 text-sm mt-1.5">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-text-muted mb-2">
          {t.emailLabel}
        </label>
        <input
          {...register("email")}
          type="email"
          placeholder={t.emailPlaceholder}
          className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-text-main placeholder:text-text-muted/60 focus:outline-none focus:border-brand transition-colors"
        />
        {errors.email && (
          <p className="text-red-400 text-sm mt-1.5">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-text-muted mb-2">
          {t.contactMethodLabel}
        </label>
        <div className="flex gap-2 flex-wrap">
          {CONTACT_METHODS.map((method) => (
            <label
              key={method.value}
              className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                contactMethod === method.value
                  ? "bg-brand border-brand text-text-main"
                  : "bg-black/30 border-white/10 text-text-muted hover:border-white/30"
              }`}
            >
              <input
                type="radio"
                value={method.value}
                {...register("contactMethod")}
                className="sr-only"
              />
              {method.label}
            </label>
          ))}
        </div>
      </div>

      {contactMethod !== "email" && (
        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">
            {contactMethod === "telegram"
              ? t.contactValueLabelTelegram
              : t.contactValueLabelInstagram}
          </label>
          <input
            {...register("contactValue")}
            type="text"
            placeholder={
              contactMethod === "telegram"
                ? t.contactValuePlaceholderTelegram
                : t.contactValuePlaceholderInstagram
            }
            className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-text-main placeholder:text-text-muted/60 focus:outline-none focus:border-brand transition-colors"
          />
          {errors.contactValue && (
            <p className="text-red-400 text-sm mt-1.5">
              {errors.contactValue.message}
            </p>
          )}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-text-muted mb-2">
          {t.commentLabel}
        </label>
        <textarea
          {...register("comment")}
          rows={4}
          placeholder={t.commentPlaceholder}
          className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-text-main placeholder:text-text-muted/60 focus:outline-none focus:border-brand transition-colors resize-none"
        />
        {errors.comment && (
          <p className="text-red-400 text-sm mt-1.5">
            {errors.comment.message}
          </p>
        )}
      </div>

      {status === "error" && serverError && (
        <p className="text-red-400 text-sm text-center">{serverError}</p>
      )}

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? t.submitLoading : t.submitIdle}
      </Button>
    </form>
  );
};
