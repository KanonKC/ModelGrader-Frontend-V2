import { Check, X } from 'lucide-react';
import { ReactNode } from 'react';
import { Badge } from './ui/Badge';

const CheckBadge = ({
    checked = false,
    noIcon=false,
    children,
    className=""
}: {
    checked?: boolean;
    noIcon?: boolean;
    children?: ReactNode;
    className?: string;
}) => {
    return checked ? (
        <Badge className={"cursor-pointer " + className}>
            {!noIcon && <Check className="mr-1" size={12} />}
            {children}
        </Badge>
    ) : (
        <Badge className={"cursor-pointer bg-red-500 hover:bg-red-400 " + className}>
            {!noIcon && <X className="mr-1" size={12} />}
            {children}
        </Badge>
    );
};

export default CheckBadge