const getSixMonthDate = () => {
    let sixMonthDate = new Date();

    sixMonthDate.setMonth(sixMonthDate.getMonth() + 6);
    return sixMonthDate;
};

export default getSixMonthDate;
