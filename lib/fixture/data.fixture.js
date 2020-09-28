const dataObject = {
	name: 'name',
	some: [{name: 'j'}],
	addressField: ['city', 'state', 'zipdecode'],
	bool: true,
	num: 33,
	badBool: false,
	nully: null,
	undefin: undefined
};

const translatedES = {
	name: 'name-es',
	some: [{name: 'j-es'}],
	addressField: ['city-es', 'state-es', 'zipdecode-es'],
	bool: true,
	num: 33,
	badBool: false,
	nully: null,
	undefin: undefined
};

const translatedAR = {
	name: 'name-ar',
	some: [{name: 'j-ar'}],
	addressField: ['city-ar', 'state-ar', 'zipdecode-ar'],
	bool: true,
	num: 33,
	badBool: false,
	nully: null,
	undefin: undefined
};

module.exports = {
	dataObject,
	translatedES,
	translatedAR
};
