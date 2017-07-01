const dataObject = {name: 'name', some: [{name: 'j'}], addressField: ['city', 'state', 'zipdecode'], bool: true, num: 33, badBool: false, nully: null, undefin: undefined};
const transaltedES = {name: 'name-es', some: [{name: 'j-es'}], addressField: ['city-es', 'state-es', 'zipdecode-es'], bool: true, num: 33, badBool: false, nully: null, undefin: undefined};

module.exports = {
	dataObject,
	transaltedES
};
