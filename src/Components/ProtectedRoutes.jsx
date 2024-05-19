import React from 'react';
import { Navigate} from 'react-router-dom';
import swal from 'sweetalert';

export default function ProtectedRoutes({children}) {
    const token = localStorage.getItem('userToken');
        if (!token) {
            swal('Please Sign In to veiw the content of Cart page !');
            return(
                <>
                <Navigate to='/signin' replace/>
                </>
            )
        }
    return children;
}
