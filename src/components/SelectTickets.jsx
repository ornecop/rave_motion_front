const SelectTickets = ({ ticket, handleTicketSelect, selectedTickets }) => {
    const availableQ = ticket.maxQuantity - ticket.sells;

    if (availableQ && availableQ > 4) {
        return (
            <form>
                <select
                    className="inputSelect w-fit text-normal"
                    onChange={handleTicketSelect}
                    id={ticket.id}
                    value={selectedTickets[ticket.id]?.quantity || 0}
                >
                    <>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </>
                </select>
            </form>
        );
    } else if (availableQ && availableQ < 4) {
        let arr = [];
        for (let i = 1; i <= availableQ; i++) {
            arr.push(i);
        }
        return (
            <form>
                <select
                    className="inputSelect w-fit text-normal"
                    onChange={handleTicketSelect}
                    id={ticket.id}
                    value={selectedTickets[ticket.id]?.quantity || 0}
                >
                    <option value="0">0</option>
                    {arr.map((index) => (
                        <option key={index} value={index}>
                            {index}
                        </option>
                    ))}
                </select>
            </form>
        );
    } else {
        return <span className="font-semibold text-red-400">SOLD OUT</span>;
    }
};

export default SelectTickets;
