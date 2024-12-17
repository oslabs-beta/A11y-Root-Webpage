import { ProfilePageProps } from '../types';
import ProfileContainer from '../components/ProfileContainer';

function ProfileDashboard({ userInfo }: ProfilePageProps) {
  return (
    <main className='profile-dashboard'>
      <ProfileContainer userInfo={userInfo} />
    </main>
  );
}

export default ProfileDashboard;
