import { getTranslations } from 'next-intl/server'

export default async function HomePage() {
    const t = await getTranslations('HomePage');

    return (
        <div className='flex-1'>Hi {t('title')}</div>
    )
}