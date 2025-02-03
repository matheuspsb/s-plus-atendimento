import Logo from '@/components/ui/logo/Logo';
import Link from '@mui/material/Link';
import NextLink from 'next/link';

const LogoSection = () => (
    <Link component={NextLink} href="/dashboard" aria-label="theme-logo">
        <Logo />
    </Link>
);

export default LogoSection;
