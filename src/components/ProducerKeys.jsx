import { RiLineChartLine } from "react-icons/ri";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdEventAvailable } from "react-icons/md";

const ProducerKeys = () => {
    // Show keys indicator for producer on dashboard
    return (
        <section className="grid grid-cols-3 w-full place-content-between my-4 gap-16">
            <div className="p-4 rounded-xl bg-green-200 flex flex-row gap-6 items-center">
                <RiLineChartLine size="4rem" className="text-green-600" />
                <div className="w-full flex flex-col text-green-600">
                    <span className="text-4xl font-bold ">$554.500</span>
                    <h3 className="text-l block font-semibold">VENTAS</h3>
                </div>
            </div>
            <div className="p-4 rounded-xl bg-orange-200 flex flex-row gap-6 items-center">
                <HiOutlineUserGroup size="4rem" className="text-orange-600" />
                <div className="w-full flex flex-col text-orange-600">
                    <span className="text-4xl font-bold ">780</span>
                    <h3 className="text-l block font-semibold">
                        TICKETS VENDIDOS
                    </h3>
                </div>
            </div>
            <div className="p-4 rounded-xl bg-fuchsia-200 flex flex-row gap-6 items-center">
                <MdEventAvailable size="4rem" className="text-fuchsia-600" />
                <div className="w-full flex flex-col text-fuchsia-600">
                    <span className="text-4xl font-bold ">5</span>
                    <h3 className="text-l block font-semibold">
                        EVENTOS ACTIVOS
                    </h3>
                </div>
            </div>
        </section>
    );
};

export default ProducerKeys;
