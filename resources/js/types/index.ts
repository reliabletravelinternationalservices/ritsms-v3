

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
    dropdown?: { label: string; action: () => void }[]
}

export interface NavChildItem {
    title: string;
    href: string;
    isActive?: boolean;
    isShow?: boolean;
}

export interface NavItem {
    title: string;
    href?: string;
    icon?: string;
    isActive?: boolean;
    isShow?: boolean;
    children?: NavChildItem[];
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: {
        location: string;
        url: string;
        port: null | number;
        defaults: Record<string, unknown>;
        routes: Record<string, string>;
    };
    flash: {
        message: string;
        type: 'success' | 'error' | 'warning' | 'info';
    };
    settings: {
        usd_to_php_rate: number;
    };
    [key: string]: any;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    display_name: string;
    phone: string | null;
    role: 'admin' | 'agent';
    email_verified_at: string | null;
    status: 'active' | 'inactive';
    created_at: string;
    updated_at: string;
}

export type BreadcrumbItemType = BreadcrumbItem;

