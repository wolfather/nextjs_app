'use client';

import { cn } from "@/lib/utils";
import { memo, type HTMLAttributes, type ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
    title: string,
    children: ReactNode,
    type: 'alert' | 'error' | 'success' | 'none'
}

const colorClasses: Record<CardProps['type'], { bg: string; border: string }> = {
  alert: { bg: 'bg-amber-100', border: 'border-amber-300' },
  error: { bg: 'bg-red-100', border: 'border-red-300' },
  success: { bg: 'bg-green-100', border: 'border-green-300' },
  none: { bg: 'bg-gray-100', border: 'border-gray-300' },
};

function CardComponent({title, children, type = 'none', ...rest}: CardProps) {
    const { bg, border } = colorClasses[type];
    return (
        <div {...rest}
            className={cn(rest.className, bg, border, `rounded-l border-l-4 py-2 px-4`)}>
            <h3 className="font-bold text-xl mb-2">{title}</h3>
            {children}
        </div>
    );
}

export const Card = memo(CardComponent) as typeof CardComponent;
