import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { forwardRef, ReactNode, Ref } from 'react';

interface SubCardProps {
    children: ReactNode | string | null;
    content?: boolean;
    className?: string;
    contentClass?: string;
    darkTitle?: boolean;
    secondary?: ReactNode | string;
    sx?: {};
    contentSX?: {};
    title?: ReactNode | string;
}

// ==============================|| CUSTOM SUB CARD ||============================== //

const SubCard = forwardRef(
    (
        { children, content = true, contentClass, darkTitle, secondary, sx = {}, contentSX = {}, title, ...others }: SubCardProps,
        ref: Ref<HTMLDivElement>
    ) => {
        const defaultShadow = '0 2px 14px 0 rgb(32 40 45 / 8%)';

        return (
            <Card ref={ref} sx={{ border: '1px solid', borderColor: 'divider', ':hover': { boxShadow: defaultShadow }, ...sx }} {...others}>
                {/* card header and action */}
                {!darkTitle && title && (
                    <CardHeader sx={{ p: 2.5 }} title={<Typography variant="h5">{title}</Typography>} action={secondary} />
                )}
                {darkTitle && title && (
                    <CardHeader sx={{ p: 2.5 }} title={<Typography variant="h4">{title}</Typography>} action={secondary} />
                )}

                {/* content & header divider */}
                {title && <Divider />}

                {/* card content */}
                {content && (
                    <CardContent sx={{ p: 2.5, ...contentSX }} className={contentClass || ''}>
                        {children}
                    </CardContent>
                )}
                {!content && children}
            </Card>
        );
    }
);

SubCard.displayName = 'SubCard';

export default SubCard;
