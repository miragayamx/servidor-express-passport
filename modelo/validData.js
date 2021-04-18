const requiredData = (data = {}, keys = []) => {
	const validItem = keys.every((key) => Object.keys(data).includes(key));
	return validItem;
};

const validFields = (data = {}, keys = []) => {
    const validKeys = Object.keys(data).filter((el) => keys.includes(el));
	const productToUpdate = {};
	validKeys.forEach((key) => (productToUpdate[key] = data[key]));
    return productToUpdate;
};

module.exports = { requiredData, validFields };
