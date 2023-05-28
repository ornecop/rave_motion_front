// Redux
import { connect } from "react-redux";
import { setCurrentPage } from "../redux/actions/eventsActions";

const Paginado = (props) => {
    // Estado Global
    const { currentPage, homeEvents, eventsPerPage } = props;
    const { setCurrentPage } = props;

    // Paginado
    const totalPages = Math.ceil(homeEvents / eventsPerPage);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div
            className={
                pageNumbers.length > 1
                    ? "flex justify-center mt-5"
                    : "display hidden"
            }
        >
            <nav>
                <ul className="flex space-x-2 w-fit justify-self-end justify-center my-2 items-center gap-6 py-2 px-4 bg-secondary rounded-full border border-secondaryBorder ">
                    {pageNumbers.length > 1 && (
                        <li className="hover:font-semibold focus:outline-none transition-colors duration-300 disabled:opacity-50 hover:text-fuchsia-600">
                            <button
                                className=""
                                onClick={() => {
                                    setCurrentPage(currentPage - 1);
                                }}
                                disabled={currentPage === 1}
                            >
                                &#60;&#60;
                            </button>
                        </li>
                    )}

                    {pageNumbers.length > 0 &&
                        pageNumbers.map((number) => (
                            <li
                                className="hover:font-semibold focus:outline-none transition-colors duration-300 disabled:opacity-50 hover:text-fuchsia-600"
                                key={number}
                            >
                                <button
                                    className=""
                                    onClick={() => setCurrentPage(number)}
                                    disabled={number === currentPage}
                                >
                                    {number}
                                </button>
                            </li>
                        ))}

                    {pageNumbers.length > 1 && (
                        <li className="">
                            <button
                                className="hover:font-semibold focus:outline-none transition-colors duration-300 disabled:opacity-50 hover:text-fuchsia-600"
                                onClick={() => {
                                    setCurrentPage(currentPage + 1);
                                }}
                                disabled={currentPage === pageNumbers.length}
                            >
                                &#62;&#62;
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        homeEvents: state.homeEvents,
        currentPage: state.currentPage,
        eventsPerPage: state.eventsPerPage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentPage: (page) => dispatch(setCurrentPage(page)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Paginado);
