import { ProfilePageProps } from '../types';
import ProfileContainer from '../components/ProfileContainer';

function ProfileDashboard({ userInfo }: ProfilePageProps) {
  return (
    <main className='profile-dashboard'>
      <h2>User Projects</h2>
      <ProfileContainer userInfo={userInfo} />
    </main>
  );
}

export default ProfileDashboard;
