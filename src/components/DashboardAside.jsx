// React Router Dom
import { Link } from "react-router-dom";

// Hooks
import { useNavigate } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { signOut } from "../redux/actions/usersActions";

// Assets
import { TiHomeOutline } from "react-icons/ti";
import { BsCalendarPlus } from "react-icons/bs";
import { IoTicketOutline } from "react-icons/io5";
import { VscSignOut } from "react-icons/vsc";
import { GoLock } from "react-icons/go";
import {
    MdOutlineDashboardCustomize,
    MdInsertChartOutlined,
} from "react-icons/md";

const DashboardAside = ({ userData, isLogin, signOut }) => {
    // SignOut
    const navigate = useNavigate();
    const handleSignOutClick = () => {
        isLogin && signOut();
        navigate("/");
    };

    return (
        <aside className="w-1/6 bg-secondary py-4">
            {/* Section logo */}
            <div className="flex w-full px-4 py-2 items-center h-16 gap-2">
                <div className="bg-slate-500 rounded-full w-12 h-12 flex justify-center items-center text-2xl font-semibold">
                    <span>
                        {userData?.firstName &&
                            userData.firstName[0].toUpperCase()}
                    </span>
                </div>
                <div className="flex justify-center items-center text-2xl font-semibold">
                    <span>Ravemotion</span>
                </div>
            </div>

            {/* Section App */}
            <div className="dropDownItem mt-8">
                <Link className="navLinkDropdown" to="/dashboard">
                    <div className="flex flex-row items-center gap-2">
                        <MdOutlineDashboardCustomize size="1.5rem" />
                        Dashboard
                    </div>
                </Link>
            </div>
            <div className="dropDownItem ">
                <Link className="navLinkDropdown" to="/">
                    <div className="flex flex-row items-center gap-2">
                        <TiHomeOutline size="1.5rem" />
                        Home
                    </div>
                </Link>
            </div>

            {/* Section Producer */}
            <div className="dropDownItem mt-8">
                <Link className="navLinkDropdown">
                    <div className="flex flex-row items-center gap-2">
                        <MdInsertChartOutlined size="1.5rem" />
                        Ventas
                    </div>
                </Link>
            </div>
            <div className="dropDownItem ">
                <Link className="navLinkDropdown" to="/create">
                    <div className="flex flex-row items-center gap-2">
                        <BsCalendarPlus size="1.5rem" />
                        Nuevo evento
                    </div>
                </Link>
            </div>

            {/* Section User */}
            <div className="dropDownItem mt-8">
                <Link className="navLinkDropdown" to="/tickets">
                    <div className="flex flex-row items-center gap-2">
                        <IoTicketOutline size="1.5rem" />
                        Tus tickets
                    </div>
                </Link>
            </div>
            <div className="dropDownItem ">
                <Link className="navLinkDropdown" to="/changepassword">
                    <div className="flex flex-row items-center gap-2">
                        <GoLock size="1.5rem" />
                        Cambiar contraseña
                    </div>
                </Link>
            </div>
            <div className="dropDownItem ">
                <Link className="navLinkDropdown" onClick={handleSignOutClick}>
                    <div className="flex flex-row items-center gap-2">
                        <VscSignOut size="1.5rem" />
                        Cerrar sesión
                    </div>
                </Link>
            </div>
        </aside>
    );
};

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        isLogin: state.isLogin,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardAside);
