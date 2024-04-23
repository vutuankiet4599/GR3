import { useSelector } from 'react-redux';
import { userSelector } from '../redux/selectors';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
    const user = useSelector(userSelector);
    if (!user.email) {
        return <Navigate to="/" replace />;
    }
    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.element,
};

export default ProtectedRoute;
