import Link from 'next/link';
import { useTranslations } from 'next-intl'

export default function NotFound() {
  const t = useTranslations();

  return (
    <div>
      <h2>{t('NotFound.title')}</h2>
      <p>{t('NotFound.message')}</p>
      <Link href="/">{t('common.button.back_home')}</Link>
    </div>
  )
}
