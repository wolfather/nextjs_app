import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

// Can be imported from a shared config
export const locales = ["en-US", "pt-BR"];

export default getRequestConfig(async () => {
  const store = await cookies()
  const locale = store.get('locale')?.value || 'pt-BR';
  if (!locales.includes(locale as any)) notFound();

  return {
    locale,
    messages: (await import(`../../public/locales/${locale}/common.json`)).default,
  };
});
