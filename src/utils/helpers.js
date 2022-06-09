export const formatAmount = (value = 0.0, decimals = 2) => {
    const parseValue = value ? parseFloat(value) : 0.0;
    return `$${parseValue.toFixed(decimals).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
};
