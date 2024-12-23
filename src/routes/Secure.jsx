import { useAuth } from '@/hooks/useAuth';

const Secure = ({ userType, children }) => {
   const { user } = useAuth();
   console.log(user)
   return user && userType.includes(user?.user_type) ? <>{children}</> : null;
};

export default Secure;
