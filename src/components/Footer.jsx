import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-0 border-top w-100 b-0 bg-dark text-light">
            <div className="col-md-4 d-flex align-items-center text-danger">
                <Link to="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
                    <svg className="bi" width="30" height="24"></svg>
                </Link>
                <span className="mb-3 mb-md-0 text-light fs-6">Vehicles Community ,inc</span>
            </div>
        </footer>
    )
}

export default Footer