
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        navigate('/login');
        return;
      }

      if (session) {
        navigate('/');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return null;
};

export default AuthCallback;
