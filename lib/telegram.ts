import type { ContactMethod } from "@/lib/validations/order";

interface TelegramOrderPayload {
  name: string;
  email: string;
  contactMethod: ContactMethod;
  contactValue?: string;
  comment?: string;
  serviceId?: string;
  serviceTitle?: string;
  servicePrice?: string | number;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const CONTACT_METHOD_LABELS: Record<ContactMethod, string> = {
  email: "Email",
  telegram: "Telegram",
  instagram: "Instagram",
};

// Формує рядок з контактом. Для Telegram/Instagram нік стає клікабельним
// посиланням (t.me/... або instagram.com/...), щоб не копіювати вручну.
function buildContactLine(payload: TelegramOrderPayload): string {
  const label = CONTACT_METHOD_LABELS[payload.contactMethod];

  if (payload.contactMethod === "email") {
    return `💬 <b>Бажаний контакт:</b> ${label}`;
  }

  const rawHandle = (payload.contactValue ?? "").replace(/^@/, "");
  const displayHandle = `@${escapeHtml(rawHandle)}`;
  const profileUrl =
    payload.contactMethod === "telegram"
      ? `https://t.me/${encodeURIComponent(rawHandle)}`
      : `https://instagram.com/${encodeURIComponent(rawHandle)}`;

  return `💬 <b>Бажаний контакт:</b> ${label} — <a href="${profileUrl}">${displayHandle}</a>`;
}

export async function sendTelegramOrder(payload: TelegramOrderPayload) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error(
      "TELEGRAM_BOT_TOKEN або TELEGRAM_CHAT_ID не задані у .env.local",
    );
  }

  const contactLine = buildContactLine(payload);

  const lines = [
    "🆕 <b>Нова заявка з сайту</b>",
    "",
    `👤 <b>Ім'я:</b> ${escapeHtml(payload.name)}`,
    `📧 <b>Email:</b> <a href="mailto:${payload.email}">${escapeHtml(payload.email)}</a>`,
    contactLine,
  ];

  if (payload.serviceTitle) {
    lines.push(`🎯 <b>Послуга:</b> ${escapeHtml(payload.serviceTitle)}`);
  }

  if (payload.servicePrice) {
    lines.push(
      `💰 <b>Ціна:</b> від $${escapeHtml(String(payload.servicePrice))}`,
    );
  }

  if (payload.comment) {
    lines.push("", `💬 <b>Коментар:</b> ${escapeHtml(payload.comment)}`);
  }

  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: lines.join("\n"),
        parse_mode: "HTML",
      }),
    },
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Telegram API повернув помилку: ${errorBody}`);
  }
}
