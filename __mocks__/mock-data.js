
const mockDataObject = {name: 'name', some: [{name: 'j'}], addressField: ['city', 'state', 'zipdecode'], bool: true, num: 33, badBool: false, nully: null, undefined: undefined};
const transaltedES = {name: 'name-es', some: [{name: 'j-es'}], addressField: ['city-es', 'state-es', 'zipdecode-es'], bool: true, num: 33, badBool: false, nully: null, undfined: undefined};

module.exports = {
	mockDataObject,
	transaltedES
};
