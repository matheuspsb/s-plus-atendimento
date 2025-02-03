// material-ui
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';

// project imports
import { UserProfile } from '@/types/use-profile';
import { getImageUrl, ImagePath } from '@/utils/getImageUrl';
import AvatarStatus from './AvatarStatus';

interface UserAvatarProps {
    user: UserProfile;
}

const UserAvatar = ({ user }: UserAvatarProps) => (
    <Badge
        overlap="circular"
        badgeContent={<AvatarStatus status={user.online_status!} />}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
        }}
    >
        <Avatar alt={user.name} src={user.avatar && getImageUrl(`${user.avatar}`, ImagePath.USERS)} />
    </Badge>
);

export default UserAvatar;
